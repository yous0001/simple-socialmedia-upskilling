import { dbConnection } from "../../index.js";

export const checkOwnership = (table="posts") => {
    return (req, res, next) => {
        const { id } = req.params;
        const user = req.user
        dbConnection.query(`SELECT * FROM ${table} WHERE id = ?`, [id],(err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: 'Error checking ownership' });
            }
            if (result.length === 0) {
                return res.status(404).json({ success: false, message: 'Resource not found' });
            }
            if(user.id!==result[0].user_id)
                return res.status(401).json({success:false,message:"You are not authorized to access this resource"})
            req.record=result[0]
            next()
        })
    }
}