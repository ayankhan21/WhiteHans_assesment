import mongoose, { Document } from "mongoose";

interface OTPDocument extends Document {
  email: string;
  code: string;
  expiresAt: Date;
}

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model<OTPDocument>("OTP", OTPSchema);
