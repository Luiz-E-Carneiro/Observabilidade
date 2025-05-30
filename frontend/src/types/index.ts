export type StepType = {
  name: string;
  detail: string;
  complete: boolean;
  error: boolean;
  timestamp: string;
  updatedAt: string;
  createdAt: string;
};

export type ProcessType = {
  _id: string;
  system_id: string;
  process_name: string;
  steps: StepType[];
  timestamp: string;
  updatedAt: string;
  createdAt: string;
};