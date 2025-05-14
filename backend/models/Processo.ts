import mongoose, { Document, Schema } from "mongoose";
import { StepSchema, IStep } from "./Step";

export interface IProcess extends Document {
  system_id: string;
  process_name: string;
  steps: IStep[];
}

const processSchema = new Schema<IProcess>({
  system_id: { type: String, required: true },
  process_name: { type: String, required: true },
  steps: { type: [StepSchema], required: true }
});

const Processo = mongoose.model<IProcess>('Processo', processSchema);

export default Processo;
