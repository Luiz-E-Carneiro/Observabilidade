"use client"

import { useEffect, useState } from 'react';
import { apiBack } from '@/apiBack';
import { ProcessType } from '@/types';
import Process from '@/components/Process';
import Header from '@/components/Header';
import React from 'react';

/**
 * Página principal que exibe uma lista de processos com filtro dinâmico.
 * 
 * - Busca os processos do backend ao montar.
 * - Permite ao usuário filtrar por ID, system_id e nome do processo.
 */
export default function Home() {
  const [processes, setProcesses] = useState<ProcessType[]>([]);
  const [filtered, setFiltered] = useState<ProcessType[]>([]); 

  useEffect(() => {
    apiBack.getAllProcesses().then((data) => {      
      setProcesses(data);
      setFiltered(data);
    });
  }, []);

  /**
   * Aplica filtros à lista original de processos com base nos critérios informados.
   *
   * @param {Object} filters - Objeto com os critérios de filtragem.
   * @param {string} filters._id - Filtro por ID do processo.
   * @param {string} filters.sys_id - Filtro por System ID.
   * @param {string} filters.name - Filtro por nome do processo.
   */
  const applyFilters = (filters: { _id: string; sys_id: string; name: string }) => {
    const filteredList = processes.filter((p) => {
      return (
        (!filters._id || p._id.toString().includes(filters._id)) &&
        (!filters.sys_id || p.system_id.toLowerCase().includes(filters.sys_id.toLowerCase())) &&
        (!filters.name || p.process_name.toLowerCase().includes(filters.name.toLowerCase()))
      );
    });
    setFiltered(filteredList);
  };

  return (
    <main className="px-6 py-4 min-h-screen bg-[var(--background)]">
      <Header onFilter={applyFilters} />
      <ul className="">
        {filtered.map((p) => (
          <Process key={p._id} processo={p} />
        ))}
      </ul>
    </main>
  );
}