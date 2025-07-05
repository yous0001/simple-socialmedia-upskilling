import jwt from 'jsonwebtoken';
import { dbConnection } from '../../index.js';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your_access_secret';

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Access token not found' });
        }

        const decoded = await jwt.verify(token, ACCESS_TOKEN_SECRET)
        dbConnection.query(`SELECT name,email,id FROM users WHERE id = ?`, [decoded.id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: 'Error checking email' });
            }
            if(result.length === 0)
                return res.status(401).json({ success: false, message: 'user not found may be deleted' });
            req.user = result[0];
            next();
        });
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ success: false, message: 'Access token has expired' });
        }
        return res.status(401).json({ success: false, message: 'Invalid access token' });
    }

};
