import Otp from "../models/otp.model.js";
import { generateOtp } from "../utils/otp.js";

// create otp for user
export const createOtp = async (userId) => {
  // delete existing otps for user
  await Otp.deleteMany({ userId });

  // generate new otp
  const code = generateOtp();

  // set expiry time 5 minutes
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // create otp record
  const otp = await Otp.create({
    userId,
    code,
    expiresAt,
  });

  return otp;
};

// verify otp for user
export const verifyOtp = async (userId, code) => {
  // find otp record
  const otp = await Otp.findOne({ userId, code });

  // validate otp
  if (!otp) {
    throw new Error("Invalid OTP");
  }

  // check expiry
  if (otp.expiresAt < new Date()) {
    throw new Error("OTP has expired");
  }

  // delete otp after verification
  await Otp.deleteMany({ userId });

  return true;
};
