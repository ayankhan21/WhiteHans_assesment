import { Request, Response, NextFunction, RequestHandler } from "express";
import Otp from "../models/Otp";
import { sendOTP } from "../utils/emailUtil";

export const generateOTP: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

    await Otp.create({ email, code: otp, expiresAt });
    await sendOTP(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, code } = req.body;
    if (!email || !code)
      return res.status(400).json({ message: "Email and OTP are required" });

    const otp = await Otp.findOne({
      email,
      code,
      expiresAt: { $gt: new Date() },
    });
    if (!otp)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    await otp.deleteOne(); // Clean up after verification
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    next(error);
  }
};
