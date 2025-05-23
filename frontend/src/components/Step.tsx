import { CheckCircle, XCircle, CircleSlash2, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { StepType } from '@/types';

export default function Step({ step }: { step: StepType }) {
  const [open, setOpen] = useState(false);

  const getIcon = () => {
    if (step.complete) return <CheckCircle className="text-green-500" />;
    if (step.error) return <XCircle className="text-red-500" />;
    return <CircleSlash2 className="text-gray-400" />;
  };

  return (
    <li className="p-2 hover:bg-[#7575753a] transition-colors duration-200">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="font-medium">{step.name}</span>
        </div>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </div>

      {open && (
        <div className="text-sm text-[#c5c3c3] mt-2 pl-8">
          {step.detail}
        </div>
      )}
    </li>
  );
}
