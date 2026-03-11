import React, { useEffect, useState } from 'react';
import { useDesignStore } from '../../store/designStore';
import { getFurnitureCatalog } from '../../api/designerApi';

const CATEGORIES = ['All', 'Seating', 'Tables', 'Storage', 'Beds', 'Lighting'];

const FurnitureSidebar = () => {
  const [catalog, setCatalog] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const addFurniture = useDesignStore((s) => s.addFurniture);

  useEffect(() => {
    getFurnitureCatalog()
      .then(({ data }) => setCatalog(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const filtered = catalog.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'All' || item.category === category;
    return matchSearch && matchCategory;
  });

  const handleAdd = (item) => {
    addFurniture({
      id: crypto.randomUUID(),
      type: item.type,
      label: item.name,
      x: 50,
      y: 50,
      width: item.defaultWidth ?? 80,
      height: item.defaultDepth ?? 80,
      rotation: 0,
      color: item.defaultColor ?? '#A0855B',
    });
  };

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="p-3 border-b border-gray-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Furniture</h2>
        <input
          type="search"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
      </div>

      <div className="flex gap-1 px-2 py-2 border-b border-gray-100 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`text-xs px-2 py-0.5 rounded-full border transition ${
              category === c
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">No items found</p>
        ) : (
          filtered.map((item) => (
            <button
              key={item._id}
              onClick={() => handleAdd(item)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-50 transition group"
            >
              <span className="block text-sm font-medium text-gray-700 group-hover:text-indigo-700">
                {item.name}
              </span>
              <span className="block text-xs text-gray-400">{item.category}</span>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};

export default FurnitureSidebar;
