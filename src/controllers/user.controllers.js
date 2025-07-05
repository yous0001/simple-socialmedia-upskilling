import { generateAndSendVerificationEmail, generateAndSetAuthCookies } from '../services/user.services.js';
import { dbConnection } from './../../index.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
    const { name, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    dbConnection.query(`INSERT INTO users(name,email,password) VALUES(?,?,?)`, [name, email, hashedPassword],
        (err, result) => {
            if (err) {
                next(err)
            }
        }
    )
    const isEmailSent = await generateAndSendVerificationEmail({ name, email })
    if (!isEmailSent) {
        next(new Error('Error sending verification email', { cause: 500 }))
    }

    res.status(201).json({ success: true, message: "user created successfully" })
}

export const login = (req, res) => {
    const { email, password } = req.body;
    dbConnection.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
        if (err) {
            //error occurs in query
            console.error(err);
            res.status(500).json({ success: false, message: 'Error checking email' });
        } else if (result.length > 0) {
            //user exists check if password correct
            const user = result[0]
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (isPasswordValid) {
                generateAndSetAuthCookies(res, user);
                res.status(200).json({ success: true, message: 'Login successful' });
            } else {
                res.status(400).json({ success: false, message: 'invalid credentials' });
            }
        } else {
            //user does not exist
            res.status(400).json({ success: false, message: 'invalid credentials' });
        }
    });
}

export const verifyEmail = async (req, res) => {
    const { token } = req.params;
    const decodedToken = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET);
    const { email } = decodedToken;
    dbConnection.query(`UPDATE users SET isEmailVerified = 1 WHERE email = ?`, [email], (err, result) => {
        if (err) {
            next(err)
        } else {
            res.status(200).json({ success: true, message: 'Email verified successfully' });
        }
    });
}

export const logout = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const refreshToken = async (req, res,next) => {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_secret';
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ success: false, message: 'Refresh token not found' });
    }
    try {
        const decoded = jwt.verify(refreshToken,REFRESH_TOKEN_SECRET);
        dbConnection.query(`SELECT * FROM users WHERE id = ?`, [decoded.id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: 'Error checking email' });
            }
            if(result.length === 0)
                return res.status(401).json({ success: false, message: 'user not found may be deleted' });
            const user = result[0];
            if (user.isEmailVerified) {
                generateAndSetAuthCookies(res, user);
                res.status(200).json({ success: true, message: 'Refresh token successful' });
            } else {
                res.status(401).json({ success: false, message: 'User is not verified' });
            }
        });
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ success: false, message: 'Refresh token has expired' });
        }
        next(err);
    }
};

export const profile = (req, res) => {
    res.status(200).json({ success: true, message: 'Profile fetched successfully', user: req.user });
};