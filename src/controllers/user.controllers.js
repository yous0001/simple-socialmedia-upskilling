import { dbConnection } from './../../index.js';

export const register=(req,res)=>{
    const {name,email,password}=req.body
    const hashedPassword=bcrypt.hashSync(password,10)
    dbConnection.query(`INSERT INTO users(name,email,password) VALUES(?,?,?)`,[name,email,hashedPassword],
    (err,result)=>{
        if(err){
            console.error(err)
            res.status(500).json({
                success:false,
                message:"Error creating user",
                error:err?.message||err
            })
        }
    }
    )

    res.status(201).json({success:true,message:"user created successfully"})
}

export const login=(req,res)=>{
    const { email ,password} = req.body;
    dbConnection.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
        if (err) {
            //error occurs in query
            console.error(err);
            res.status(500).json({ success:false,message: 'Error checking email' });
        } else if (result.length > 0) {
            //user exists check if password correct
            const isPasswordValid = bcrypt.compareSync(password, result[0].password);
            if (isPasswordValid) {
                res.status(200).json({ success:true,message: 'Login successful' });
            } else {
                res.status(400).json({ success:false,message: 'invalid credentials' });
            }
        } else {
            //user does not exist
            res.status(400).json({ success:false,message: 'invalid credentials' });
        }
    });
}