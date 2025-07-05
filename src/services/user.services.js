import jwt from "jsonwebtoken";
import sendmailservice from "./send-mail.service.js";
import { generateVerificationEmail } from "../services/email-templates.js";

export const generateAndSendVerificationEmail = async ({ name, email }) => {
    const VERIFICATION_TOKEN_SECRET = process.env.JWT_VERIFICATION_SECRET || 'your_verification_secret';
    const verificationToken = jwt.sign({ email }, VERIFICATION_TOKEN_SECRET, { expiresIn: '1d' })
    const isEmailSent = await sendmailservice({
        to: email,
        subject: "Email verification",
        message: generateVerificationEmail(name, email, `http://localhost:3000/auth/verify-email/${verificationToken}`)
    })
    return isEmailSent
}

export const generateAccessToken = (user) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your_access_secret';
    return jwt.sign(
        { id: user.id, email: user.email },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }//it's 1 day for now to test but it should be 15min : 1 hour later
    );
};

export const generateRefreshToken = (user) => {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_secret';
    return jwt.sign(
        { id: user.id, email: user.email },
        REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

export const generateAndSetAuthCookies = (res, user) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge:  24 * 60 * 60 * 1000 // 1 day
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};
