import express from 'express';
import { register, verifyEmailOtp } from '../controllers/auth.controller.js';

const router = express.Router()

router.post('/register', register);

router.post('/verify-otp', verifyEmailOtp)

// test email 
//  router.get('/test-email', testEmail);


export default router;