import nodemailer from 'nodemailer';

// Generate Ethereal test account or use provided environment variables
export const sendEmail = async ({ to, subject, html }) => {
  try {
    // We use ethereal for development mail sending
    // For production, supply actual credentials in .env
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || account.user,
        pass: process.env.SMTP_PASS || account.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"SaaS Manager" <noreply@saasmanager.com>',
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Email sending failed');
  }
};
