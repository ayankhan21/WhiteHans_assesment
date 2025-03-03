import express from "express";
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} from "../controllers/jobController";

const router = express.Router();

router.post("/create", createJob);
router.get("/", getJobs);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
