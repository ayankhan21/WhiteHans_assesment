import { Request, Response } from "express";
import Job from "../models/Job";

export const createJob = async (req: Request, res: Response) => {
  const job = await Job.create(req.body);
  res.status(201).json(job);
};

export const getJobs = async (req: Request, res: Response) => {
  const { search, type, location, limit = 10, offset = 0 } = req.query;

  const query: any = {};

  if (search) query.title = { $regex: search, $options: "i" };

  if (type) {
    const typesArray = (type as string).split(",").map((t) => t.trim());
    query.type = { $in: typesArray };
  }

  if (location) query.location = { $regex: location, $options: "i" };

  const jobs = await Job.find(query).limit(Number(limit)).skip(Number(offset));

  res.json(jobs);
};

export const updateJob = async (req: Request, res: Response) => {
  const allowedUpdates = ["title", "location", "type", "description", "email"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates!" });
  }

  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    return res.status(404).json({ error: "Job not found!" });
  }

  res.json(job);
};

export const deleteJob = async (req: Request, res: Response) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({ error: "Job not found!" });
  }

  await job.deleteOne();
  res.status(200).send();
};
