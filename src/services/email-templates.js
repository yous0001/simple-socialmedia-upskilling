export function generateVerificationEmail(name, email, verificationLink) {
    const currentYear = new Date().getFullYear();

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your YE Account</title>
            <style>
                /* Base styles */
                body {
                    font-family: 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
                    background-color: #f8fafc;
                    margin: 0;
                    padding: 0;
                    color: #1e293b;
                    line-height: 1.5;
                }
                
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .email-card {
                    background-color: #ffffff;
                    border-radius: 16px;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
                    overflow: hidden;
                }
                
                .header {
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    padding: 40px 20px;
                    text-align: center;
                }
                
                .logo {
                    color: white;
                    font-size: 28px;
                    font-weight: 800;
                    text-decoration: none;
                    display: inline-block;
                }
                
                .content {
                    padding: 40px;
                }
                
                h1 {
                    color: #1e293b;
                    font-size: 24px;
                    font-weight: 700;
                    margin-top: 0;
                    margin-bottom: 24px;
                    text-align: center;
                }
                
                p {
                    margin-bottom: 24px;
                    font-size: 16px;
                    color: #475569;
                }
                
                .cta-container {
                    text-align: center;
                    margin: 32px 0;
                }
                
                .verify-button {
                    display: inline-block;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: white !important;
                    text-decoration: none;
                    padding: 16px 32px;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 16px;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .verify-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.25);
                }
                
                .footer {
                    text-align: center;
                    padding: 24px;
                    font-size: 14px;
                    color: #64748b;
                    border-top: 1px solid #f1f5f9;
                }
                
                .link-alternative {
                    background-color: #f8fafc;
                    border-radius: 8px;
                    padding: 16px;
                    font-size: 14px;
                    color: #475569;
                    word-break: break-all;
                    text-align: center;
                    margin: 24px 0;
                    border: 1px solid #e2e8f0;
                }
                
                .small-text {
                    font-size: 14px;
                    color: #64748b;
                    text-align: center;
                }
                
                .social-links {
                    margin: 24px 0;
                }
                
                .social-links a {
                    display: inline-block;
                    margin: 0 12px;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                }
                
                .social-links a:hover {
                    opacity: 1;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="email-card">
                    <div class="header">
                        <div class="logo">YE</div>
                    </div>
                    
                    <div class="content">
                        <h1>Welcome to YE, ${name}!</h1>
                        <p>Thank you for joining our community. To get started, please verify your email address by clicking the button below:</p>
                        
                        <div class="cta-container">
                            <a href="${verificationLink}" class="verify-button">Verify Email Address</a>
                        </div>
                        
                        <p class="small-text">This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
                        
                        <div class="link-alternative">
                            Or paste this link into your browser:<br>
                            <a href="${verificationLink}" style="color: #6366f1; text-decoration: none;">${verificationLink}</a>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <div class="social-links">
                            <a href="" target="_blank">
                                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="24">
                            </a>
                            <a href="" target="_blank">
                                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24">
                            </a>
                            <a href="" target="_blank">
                                <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" width="24">
                            </a>
                        </div>
                        
                        <p>© ${currentYear} YE Social Media App. All rights reserved.</p>
                        <p>123 Social Street, Tech City, TC 10001</p>
                        
                        <p>
                            <a href="" style="color: #64748b; text-decoration: underline;">Unsubscribe</a> | 
                            <a href="" style="color: #64748b; text-decoration: underline;">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>
  `;
}

