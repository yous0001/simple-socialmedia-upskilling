import jwt from "jsonwebtoken";
import sendmailservice from "./send-mail.service.js";
import { generateVerificationEmail } from "../services/email-templates.js";

export const generateAndSendVerificationEmail = async ({name,email}) => {
    const verificationToken=jwt.sign({email},process.env.JWT_VERIFICATION_SECRET,{expiresIn:'1d'})
    const isEmailSent=await sendmailservice({
        to:email,
        subject:"Email verification",
        message:generateVerificationEmail(name,email,`http://localhost:3000/auth/verify-email/${verificationToken}`)
    })
    return isEmailSent
}