import express from "express";
import { generateOTP, verifyOTP } from "../controllers/otpController";

const otpRoutes = express.Router();

otpRoutes.post("/generate", generateOTP);
otpRoutes.post("/verify", verifyOTP);

export default otpRoutes;
