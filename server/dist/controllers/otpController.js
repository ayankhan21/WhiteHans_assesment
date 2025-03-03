"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.generateOTP = void 0;
const Otp_1 = __importDefault(require("../models/Otp"));
const emailUtil_1 = require("../utils/emailUtil");
const generateOTP = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ message: "Email is required" });
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry
        await Otp_1.default.create({ email, code: otp, expiresAt });
        await (0, emailUtil_1.sendOTP)(email, otp);
        return res.status(200).json({ message: "OTP sent successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.generateOTP = generateOTP;
const verifyOTP = async (req, res, next) => {
    try {
        const { email, code } = req.body;
        if (!email || !code)
            return res.status(400).json({ message: "Email and OTP are required" });
        const otp = await Otp_1.default.findOne({
            email,
            code,
            expiresAt: { $gt: new Date() },
        });
        if (!otp)
            return res.status(400).json({ message: "Invalid or expired OTP" });
        await otp.deleteOne(); // Clean up after verification
        res.status(200).json({ message: "OTP verified successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyOTP = verifyOTP;
