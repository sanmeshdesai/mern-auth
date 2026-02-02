import { registerUser } from "../services/auth.service.js";
import { sendOtpEmail } from "../services/email.service.js";
import { createOtp, verifyOtp } from "../services/otp.service.js";
import User from "../models/user.model.js";
// import { sendOtpEmail } from "../services/email.service.js";

// register user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // create user
    const user = await registerUser({ name, email, password });

    // create otp and send email
    const otp = await createOtp(user._id);
    await sendOtpEmail(user.email, otp.code);
    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// export const testEmail = async (req, res) => {
// test email
//    await sendOtpEmail("sanmeshdesai75@gmail.com", "123456");
//    res.json({ message: "Test email sent" });
// };

// verify email otp
export const verifyEmailOtp = async (req, res) => {
  // extract userId and otp from request body
  const { userId, otp } = req.body;

  try {
    // verify otp
    await verifyOtp(userId, otp);

    // mark user as verified and save
    const user = await User.findById(userId);
    user.isVerified = true;
    await user.save();
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // resend otp if expired
    if (error.message === "OTP Expired") {
      const otp = await createOtp(userId);
      await sendOtpEmail(user.email, otp.code);

      // update lastOtpSentAt
      user.lastOtpSentAt = new Date();
      await user.save();

      return res.status(400).json({
        message: "OTP expired. A new OTP has been sent to your email.",
      });
    }

    return res.status(400).json({ message: error.message });
  }
};

// resend email otp
export const resendEmailOtp = async (req, res) => {
  const { userId } = req.body;

  // find user
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // check if already verified
  if (user.isVerified) {
    return res.status(400).json({ message: "User already verified" });
  }

  // 1 minute cooldown between otp requests
  if (user.lastOtpSentAt) {
    const diff = Date.now() - new Date(user.lastOtpSentAt).getTime();

    if (diff < 60 * 1000) {
      return res
        .status(400)
        .json({ message: "Please wait before requesting a new OTP" });
    }
  }

  // create new otp and send email
  const otp = await createOtp(userId);
  await sendOtpEmail(user.email, otp.code);

  // update lastOtpSentAt
  user.lastOtpSentAt = new Date();
  await user.save();

  res.json({ message: "OTP resent successfully" });
};
