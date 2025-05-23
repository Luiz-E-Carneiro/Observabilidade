import React, { useState } from 'react';
import { ProcessType } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Step from './Step';

type Props = {
  processo: ProcessType;
};

export default function Process({ processo }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="bg-[#ffffff14] hover:bg-[#ffffff23] transition-colors duration-200 text-[#ededed] p-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <p className="text-sm font-bold text-[#949494]">{processo.system_id}</p>
          <h2 className="text-lg font-semibold">{processo.process_name}</h2>
        </div>
        {open ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
      </div>
      {open && (
        <ul className="mt-4 space-y-2">
          {processo.steps.map((step, index) => (
            <Step key={index} step={step} />
          ))}
        </ul>
      )}
    </li>
  );
}