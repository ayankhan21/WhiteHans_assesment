import mongoose, { Document } from 'mongoose';

export interface JobDocument extends Document {
  title: string;
  location: string;
  type: string;
  description: string;
  email: string;
  createdAt: Date;
}

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<JobDocument>('Job', JobSchema);
