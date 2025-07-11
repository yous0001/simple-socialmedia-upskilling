import { dbConnection } from "../../index.js";

export const createPost = (req, res) => {
    const user=req.user
    const {title,description}=req.body
    if(!user.isEmailVerified){
        return res.status(401).json({ success: false, message: 'User is not verified' });
    }
    if(!title || !description){
        return res.status(400).json({ success: false, message: 'Title and description are required' });
    }
    dbConnection.query(
            `INSERT INTO posts(user_id, title, description) VALUES(?,?,?)`,
            [user.id, title, description],
            (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ success: false, message: 'Error creating post' });
                }
            }
        );
    res.status(200).json({ success: true, message: 'Post created successfully' });
};

export const getMyPosts = (req, res) => {
    const user=req.user
    dbConnection.query(`SELECT * FROM posts WHERE user_id = ?`, [user.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Error getting posts' });
        }
        res.status(200).json({ success: true, message: 'Posts fetched successfully', posts: result });
    });
};

export const getAllPosts = (req, res) => {
    dbConnection.query(`SELECT * FROM posts`, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Error getting posts' });
        }
        res.status(200).json({ success: true, message: 'Posts fetched successfully', posts: result });
    });
};