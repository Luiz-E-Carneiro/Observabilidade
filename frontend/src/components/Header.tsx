import { useState } from 'react';

type Props = {
  onFilter: (filters: { _id: string; sys_id: string; name: string }) => void;
};

export default function Header({ onFilter }: Props) {
  const [filters, setFilters] = useState({ _id: '', sys_id: '', name: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <header className="p-4 bg-white shadow mb-6">
      <form className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="_id" className="block text-sm font-medium">ID:</label>
          <input
            type="text"
            name="_id"
            className="w-full border rounded px-2 py-1"
            onChange={handleChange}
            value={filters._id}
          />
        </div>
        <div>
          <label htmlFor="sys_id" className="block text-sm font-medium">System ID:</label>
          <input
            type="text"
            name="sys_id"
            className="w-full border rounded px-2 py-1"
            onChange={handleChange}
            value={filters.sys_id}
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Process Name:</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-2 py-1"
            onChange={handleChange}
            value={filters.name}
          />
        </div>
      </form>
    </header>
  );
}