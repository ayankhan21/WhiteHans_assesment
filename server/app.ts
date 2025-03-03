import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import jobRoutes from "./routes/jobRoutes";
import otpRoutes from "./routes/otpRoutes";
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/otp", otpRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
