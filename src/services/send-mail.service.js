import nodemailer from "nodemailer"
import { config } from "dotenv";

config()
const sendmailservice=async({ to = '', subject = 'no-reply', message = '<h1>Hello World</h1>', attachments = [] })=>{
    const transporter=nodemailer.createTransport({
        host:'localhost',
        service:'gmail',
        port:587,
        secure:false,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD
        }
    })
    const info = await transporter.sendMail({
        from: `"YE" <${process.env.EMAIL}>`, 
        to, 
        subject,  
        html:message, 
        attachments
    });
    return info.accepted.length?true:false
} 

export default sendmailservice