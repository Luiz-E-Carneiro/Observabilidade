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
    console.log('Testado--------------------');
    
    apiBack.getAllProcesses().then((data) => {
      setProcesses(data);
      setFiltered(data);
    });
  }, []);

  const applyFilters = (filters: { _id: string; sys_id: string; name: string }) => {
    const filteredList = processes.filter((p) => {
      return (
        (!filters._id || p.id.includes(filters._id)) &&
        (!filters.sys_id || p.system_id.toLowerCase().includes(filters.sys_id.toLowerCase())) &&
        (!filters.name || p.process_name.toLowerCase().includes(filters.name.toLowerCase()))
      );
    });
    setFiltered(filteredList);
  };



  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <Header onFilter={applyFilters} />
      <ul>
        {filtered.map((p) => (
          <Process key={p.id} processo={p} />
        ))}
      </ul>
    </main>
  );
}

