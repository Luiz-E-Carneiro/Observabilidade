export type StepType = {
  name: string;
  detail: string;
  complete: boolean;
  error: boolean;
};

export type ProcessType = {
  id: string;
  system_id: string;
  process_name: string;
  steps: StepType[];
  timestamp: string;
};