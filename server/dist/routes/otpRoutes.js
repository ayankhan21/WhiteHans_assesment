"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otpController_1 = require("../controllers/otpController");
const otpRoutes = express_1.default.Router();
otpRoutes.post("/generate", otpController_1.generateOTP);
otpRoutes.post("/verify", otpController_1.verifyOTP);
exports.default = otpRoutes;
