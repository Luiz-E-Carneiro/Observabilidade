import { useState } from 'react';
import { StepType } from '@/types';
import { CheckCircle, XCircle, Circle, ChevronDown, ChevronRight } from 'lucide-react';

export default function Step({ step }: { step: StepType }) {
  const [open, setOpen] = useState(false);

  const getIcon = () => {
    if (step.complete) return <CheckCircle className="text-green-500" />;
    if (step.error) return <XCircle className="text-red-500" />;
    return <Circle className="text-gray-400" />;
  };

  return (
    <li className="border rounded p-2">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="font-medium">{step.name}</span>
        </div>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </div>

      {open && (
        <div className="text-sm text-gray-600 mt-2 pl-6">
          {step.detail}
        </div>
      )}
    </li>
  );
}
