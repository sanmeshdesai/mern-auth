import express from "express";
import {
  register,
  resendEmailOtp,
  verifyEmailOtp,
} from "../controllers/auth.controller.js";

const router = express.Router();

// register user
router.post("/register", register);

// verify email otp
router.post("/verify-otp", verifyEmailOtp);

// resend email otp
router.post("/resend-otp", resendEmailOtp);

// test email
//  router.get('/test-email', testEmail);

export default router;
