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
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(job);
};

export const deleteJob = async (req: Request, res: Response) => {
  await Job.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
