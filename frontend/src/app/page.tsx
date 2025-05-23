"use client"

import { useEffect, useState } from 'react';
import { apiBack } from '@/apiBack';
import { ProcessType } from '@/types';
import Process from '@/components/Process';
import Header from '@/components/Header';
import React from 'react';

export default function Home() {
  const [processes, setProcesses] = useState<ProcessType[]>([]);
  const [filtered, setFiltered] = useState<ProcessType[]>([]); 

  useEffect(() => {
    apiBack.getAllProcesses().then((data) => {      
      setProcesses(data);
      setFiltered(data);
    });
  }, []);

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
    <main className="p-8 min-h-screen bg-[#1F1F1F] text-[#ededed]">
      <Header onFilter={applyFilters} />
      <ul className="">
        {filtered.map((p) => (
          <Process key={p._id} processo={p} />
        ))}
      </ul>
    </main>
  );
}