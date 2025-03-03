"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.getJobs = exports.createJob = void 0;
const Job_1 = __importDefault(require("../models/Job"));
const createJob = async (req, res) => {
    const job = await Job_1.default.create(req.body);
    res.status(201).json(job);
};
exports.createJob = createJob;
const getJobs = async (req, res) => {
    const { search, type, location, limit = 10, offset = 0 } = req.query;
    const query = {};
    if (search)
        query.title = { $regex: search, $options: "i" };
    if (type) {
        const typesArray = type.split(",").map((t) => t.trim());
        query.type = { $in: typesArray };
    }
    if (location)
        query.location = { $regex: location, $options: "i" };
    const jobs = await Job_1.default.find(query).limit(Number(limit)).skip(Number(offset));
    res.json(jobs);
};
exports.getJobs = getJobs;
const updateJob = async (req, res) => {
    const job = await Job_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(job);
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    await Job_1.default.findByIdAndDelete(req.params.id);
    res.status(204).send();
};
exports.deleteJob = deleteJob;
