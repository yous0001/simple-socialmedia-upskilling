import { dbConnection } from "../../index.js";

export const createPost = (req, res, next) => {
    const user = req.user
    const { title, description } = req.body
    if (!user.isEmailVerified) {
        return res.status(401).json({ success: false, message: 'User is not verified' });
    }
    if (!title || !description) {
        return res.status(400).json({ success: false, message: 'Title and description are required' });
    }
    dbConnection.query(
        `INSERT INTO posts(user_id, title, description) VALUES(?,?,?)`,
        [user.id, title, description],
        (err, result) => {
            if (err) {

                res.status(500).json({ success: false, message: 'Error creating post', error: err.message });
            }
        }
    );
    res.status(200).json({ success: true, message: 'Post created successfully' });
};

export const getMyPosts = (req, res) => {
    const user = req.user
    dbConnection.query(`SELECT * FROM posts WHERE user_id = ?`, [user.id], (err, result) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error getting posts', error: err.message });
        }
        res.status(200).json({ success: true, message: 'Posts fetched successfully', posts: result });
    });
};

export const getAllPosts = (req, res) => {
    dbConnection.query(`SELECT * FROM posts`, (err, result) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error getting posts', error: err.message });
        }
        res.status(200).json({ success: true, message: 'Posts fetched successfully', posts: result });
    });
};

export const getPost = (req, res) => {
    const { id } = req.params;
    dbConnection.query(`SELECT * FROM posts WHERE id = ?`, [id], (err, result) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error getting post', error: err.message });
        }
        res.status(200).json({ success: true, message: 'Post fetched successfully', post: result[0] });
    });
};

export const deletePost = (req, res) => {
    const { id } = req.params;
    dbConnection.query(`DELETE FROM posts WHERE id = ?`, [id], (err, result) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error deleting post', error: err.message });
        }
        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    });
};

export const updatePost = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const record = req.record

    if (!title && !description) {
        return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const createdAt = new Date(record.createdAt).getTime();
    const now = Date.now();
    if (createdAt + (15 * 60 * 1000) < now) {
        return res.status(401).json({
            success: false,
            message: 'Can only update post created in last 15 minutes'
        });
    }

    dbConnection.query(`UPDATE posts SET title = ?, description = ? WHERE id = ?`, [title, description, id], (err, result) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error updating post', error: err.message });
        }
        res.status(200).json({ success: true, message: 'Post updated successfully' });
    });
};