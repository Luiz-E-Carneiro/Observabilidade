import { CheckCircle, XCircle, CircleSlash2, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { StepType } from '@/types';

/**
 * Componente que renderiza um step de processo com nome, ícone de status e detalhe expandível.
 *
 * @param {Object} props
 * @param {StepType} props.step - Objeto com dados do step (nome, status, detalhes).
 */
export default function Step({ step }: { step: StepType }) {
  const [open, setOpen] = useState(false);

  /**
   * Retorna o ícone correspondente ao status do step.
   *
   * @returns {JSX.Element} Ícone de status (completo, erro ou neutro).
   */
  const getIcon = () => {
    if (step.complete) return <CheckCircle className="text-green-500" />;
    if (step.error) return <XCircle className="text-red-500" />;
    return <CircleSlash2 className="text-gray-400" />;
  };

  return (
    <li className="p-2 hover:bg-[#7575753a] transition-colors duration-200 rounded-md">
      <div
        className="flex flex-row justify-between items-start sm:items-center cursor-pointer gap-2"
        onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2 flex-wrap">
          {getIcon()}
          <span className="font-medium text-sm sm:text-base break-words">{step.name}</span>
        </div>
        <div className="sm:ml-auto">
          {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
      </div>

      {open && (
        <div className="text-md text-[var(--second_text)] mt-2 pl-8 break-words">
          {step.detail}
        </div>
      )}
    </li>
  );
}
