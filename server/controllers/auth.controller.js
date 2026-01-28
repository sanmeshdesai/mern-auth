import { registerUser } from "../services/auth.service.js";
import { sendOtpEmail } from "../services/email.service.js";
import { createOtp, verifyOtp } from "../services/otp.service.js";
// import { sendOtpEmail } from "../services/email.service.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerUser({ name, email, password });
        const otp = await createOtp(user._id);
        await sendOtpEmail(user.email, otp.code);
        res.status(201).json({
            message: 'User registered successfully',
            userId: user._id,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

};

export const verifyEmailOtp = async (req, res) => {
    const { userId, otp } = req.body;

    await verifyOtp(userId, otp);

    await User.findByIdAndUpdate(userId, {isVerified: true});

    res.json({message: 'Email verified succefully'});
};


// test email
// export const testEmail = async (req, res) => {
//    await sendOtpEmail("sanmeshdesai75@gmail.com", "123456");
//    res.json({ message: "Test email sent" });
// };


