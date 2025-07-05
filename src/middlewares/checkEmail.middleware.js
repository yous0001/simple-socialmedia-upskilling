const checkIfEmailExists = (req, res, next) => {
    const { email } = req.body;
    dbConnection.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success:false,message: 'Error checking email' });
        } else if (result.length > 0) {
            res.status(400).json({ success:false,message: 'Email already exists' });
        } else {
            next();
        }
    });
};

export default checkIfEmailExists