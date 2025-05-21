import mongoose, { Schema, Document,model} from 'mongoose';

export interface IStep extends Document {
  name: string;
  detail: string;
  complete: boolean;
  error: boolean;
}

export const StepSchema = new Schema<IStep>({
  name: { type: String, required: true },
  detail: { type: String, required: true },
  complete: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
});

export const Step = mongoose.model('Step', StepSchema);