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