import express, { RequestHandler } from "express";
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} from "../controllers/jobController";

const router = express.Router();

router.post("/create", createJob as RequestHandler);
router.get("/", getJobs as RequestHandler);
router.put("/:id", updateJob as RequestHandler);
router.delete("/:id", deleteJob as RequestHandler);

export default router;
