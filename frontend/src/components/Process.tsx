import React, { JSX, useState } from 'react';
import { ProcessType } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Step from './Step';

type Props = {
  processo: ProcessType;
};

/**
 * Componente que renderiza um processo com seu nome, sistema e lista de steps.
 * Permite expandir e recolher os steps clicando no cabeçalho do processo.
 *
 * @param {Props} props - Objeto contendo os dados do processo.
 * @param {ProcessType} props.processo - O processo a ser exibido, contendo sistema, nome e steps.
 * @returns {JSX.Element} Elemento de lista com informações do processo e seus steps (se abertos).
 */
export default function Process({ processo }: Props): JSX.Element {
  const [open, setOpen] = useState(false);

  function formatDate(): string {
    if (!processo.steps || processo.steps.length === 0) {
      return '-';
    }

    const lastStep = processo.steps[processo.steps.length - 1];

    if (lastStep.complete && !lastStep.error) {
      const inicialDate = new Date(processo.createdAt);
      const finalDate = new Date(lastStep.updatedAt);

      const diffInMs = finalDate.getTime() - inicialDate.getTime();

      const hours = Math.floor(diffInMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

      return [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0')
      ].join(':');
    }

    return 'N/F';
  }

  return (
    <li className="bg-[#ffffff14] hover:bg-[#ffffff23] transition-colors duration-200 text-[var(--main_text)] p-4">
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <p className="text-xs sm:text-sm font-bold text-[var(--second_text)]">
            {processo.system_id}
          </p>
          <h2 className="text-base sm:text-lg font-semibold">{processo.process_name}</h2>
          <p>{formatDate()}</p>
        </div>
        <div className="ml-auto">
          {open ? (
            <ChevronUp className="text-white" />
          ) : (
            <ChevronDown className="text-white" />
          )}
        </div>
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
