import Otp from "../models/otp.model.js";
import { generateOtp } from "../utils/otp.js";

export const createOtp = async (userId) => {
    
    await Otp.deleteMany({ userId });

    const code = generateOtp();

    //5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const otp = await Otp.create({
        userId, code, expiresAt,
    });

    return otp;
};

export const verifyOtp = async (userId, code) => {
    const otp = await Otp.findOne({ userId, code });

    if(!otp.expiresAt < new Date()) throw new Error("OTP Expired");

    await Otp.deleteMany({ userId });
    
};