import { useState } from 'react';

type Props = {
  onFilter: (filters: { _id: string; sys_id: string; name: string }) => void;
};

/**
 * Componente de cabeçalho com campos de filtro para processos.
 *
 * @param {Object} props
 * @param {(filters: { _id: string; sys_id: string; name: string }) => void} props.onFilter
 * Função chamada sempre que os filtros forem atualizados.
 */
export default function Header({ onFilter }: Props) {
  const [filters, setFilters] = useState({ _id: '', sys_id: '', name: '' });

  /**
 * Atualiza os filtros locais e chama a função de filtro do componente pai.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de mudança dos inputs.
 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  /**
   * Limpa todos os campos de filtro e aplica o filtro vazio.
   */
  const handleClear = () => {
    const emptyFilters = { _id: '', sys_id: '', name: '' };
    setFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  return (
    <header className="p-4 bg-[var(--primary)] shadow mb-6 rounded">
      <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4 items-end">
        <div className="lg:col-span-3">
          <label htmlFor="_id" className="block text-sm text-[var(--foreground)] font-bold">ID:</label>
          <input
            type="text"
            name="_id"
            className="w-full border-b-2 border-b-stone-500 rounded px-2 py-1 mt-1 bg-[var(--background)] text-[var(--foreground)]"
            onChange={handleChange}
            value={filters._id}
          />
        </div>
        <div className="lg:col-span-3">
          <label htmlFor="sys_id" className="block text-sm text-[var(--foreground)] font-bold">System ID:</label>
          <input
            type="text"
            name="sys_id"
            className="w-full border-b-2 border-b-stone-500 rounded px-2 py-1 mt-1 bg-[var(--background)] text-[var(--foreground)]"
            onChange={handleChange}
            value={filters.sys_id}
          />
        </div>
        <div className="lg:col-span-3">
          <label htmlFor="name" className="block text-sm text-[var(--foreground)] font-bold">Process Name:</label>
          <input
            type="text"
            name="name"
            className="w-full border-b-2 border-b-stone-500 rounded px-2 py-1 mt-1 bg-[var(--background)] text-[var(--foreground)]"
            onChange={handleChange}
            value={filters.name}
          />
        </div>
        <div className="lg:col-span-3 flex lg:justify-end md:justify-normal sm:justify-end items-start">
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-[#d32b32] text-white rounded hover:opacity-90 w-full sm:w-auto"
          >
            Limpar filtros
          </button>
        </div>
      </form>
    </header>
  );
}
