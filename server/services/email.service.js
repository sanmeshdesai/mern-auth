import nodemailer from 'nodemailer';
import env from '../config/env.js';

export const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: env.EMAIL_HOST,
        port: env.EMAIL_PORT,
        secure: false,
        auth: {
            user: env.EMAIL_USER,
            pass: env.EMAIL_PASS,
        }
    });

    await transporter.sendMail({
        from: env.EMAIL_FROM,
        to: email,
        subject: "Verify your email",
        text: `Your otp is ${otp}. It expires in 5 minutes.`,
    });
};