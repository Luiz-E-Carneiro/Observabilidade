import { useState } from 'react';
import { ProcessType } from '@/types';
import Step from './Step';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function Process({ processo }: { processo: ProcessType }) {
  const [open, setOpen] = useState(false);

  return (
    <li id={processo.id} className="border rounded p-4 bg-white shadow mb-4">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <div>
          <div className="font-semibold">{processo.process_name}</div>
          <div className="text-sm text-gray-500">Sistema: {processo.system_id}</div>
        </div>
        {open ? <ChevronDown /> : <ChevronRight />}
      </div>

      {open && (
        <ul className="mt-4 space-y-2 pl-4">
          {processo.steps.map((step, idx) => (
            <Step key={idx} step={step} />
          ))}
        </ul>
      )}
    </li>
  );
}