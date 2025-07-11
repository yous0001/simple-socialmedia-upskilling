
import { dbConnection } from './../../index.js';

export const sendFriendRequest = (req, res) => {
    const requesterId = req.user.id;
    const { userId } = req.body;

    if (requesterId === userId) {
        return res.status(400).json({ success: false, message: "You can't friend yourself." });
    }

    const sql = `INSERT INTO friendships (requester_id, addressee_id) VALUES (?, ?)`;

    dbConnection.query(sql, [requesterId, userId], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ success: false, message: 'Friend request already sent or exists' });
            }
            return res.status(500).json({ success: false, error: err.message });
        }

        res.json({ success: true, message: 'Friend request sent' });
    });
};

export const acceptFriendRequest = (req, res) => {
    const addresseeId = req.user.id;
    const { requesterId } = req.body;

    const sql = `UPDATE friendships SET status = 'accepted' WHERE requester_id = ? AND addressee_id = ?`;

    dbConnection.query(sql, [requesterId, addresseeId], (err, result) => {
        if (err) return res.status(500).json({ success: false, error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No pending friend request found' });
        }

        res.json({ success: true, message: 'Friend request accepted' });
    });
};

export const rejectFriendRequest = (req, res) => {
    const addresseeId = req.user.id;
    const { requesterId } = req.body;

    const sql = `UPDATE friendships SET status = 'rejected' WHERE requester_id = ? AND addressee_id = ?`;

    dbConnection.query(sql, [requesterId, addresseeId], (err, result) => {
        if (err) return res.status(500).json({ success: false, error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No pending request to reject' });
        }

        res.json({ success: true, message: 'Friend request rejected' });
    });
};
