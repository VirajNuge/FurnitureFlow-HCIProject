import React, { useCallback } from 'react';
import { useDesignStore } from '../../store/designStore';

const TEXTURES = [
  { id: 'wood', label: 'Wood' },
  { id: 'fabric', label: 'Fabric' },
  { id: 'metal', label: 'Metal' },
  { id: 'leather', label: 'Leather' },
];

const PropertiesSidebar = () => {
  const { furniture, selectedId, updateFurniture } = useDesignStore();
  const selected = furniture.find((f) => f.id === selectedId);

  // Debounce colour updates so the picker doesn't lag on rapid changes
  const handleColorChange = useCallback(
    (e) => {
      const hex = e.target.value;
      if (!selected) return;
      // Write the final hex value immediately to the store so it persists after reload
      updateFurniture({ ...selected, color: hex });
    },
    [selected, updateFurniture]
  );

  const handleField = (field, value) => {
    if (!selected) return;
    const numericFields = ['x', 'y', 'width', 'height', 'rotation'];
    updateFurniture({
      ...selected,
      [field]: numericFields.includes(field) ? parseFloat(value) || 0 : value,
    });
  };

  if (!selected) {
    return (
      <aside className="w-56 bg-white border-l border-gray-200 flex items-center justify-center text-xs text-gray-400 p-4">
        Select a furniture item to edit its properties.
      </aside>
    );
  }

  return (
    <aside className="w-56 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Properties</h2>

        <p className="text-sm font-medium text-gray-800 mb-4 truncate">{selected.label || selected.type}</p>

        {/* Position */}
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-1">Position</p>
          <div className="grid grid-cols-2 gap-1">
            {['x', 'y'].map((ax) => (
              <label key={ax} className="flex flex-col text-xs">
                <span className="text-gray-500 mb-0.5">{ax.toUpperCase()}</span>
                <input type="number" value={Math.round(selected[ax])} step={1}
                  onChange={(e) => handleField(ax, e.target.value)}
                  className="border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </label>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-1">Size (cm)</p>
          <div className="grid grid-cols-2 gap-1">
            {['width', 'height'].map((dim) => (
              <label key={dim} className="flex flex-col text-xs">
                <span className="text-gray-500 mb-0.5">{dim === 'width' ? 'W' : 'D'}</span>
                <input type="number" value={Math.round(selected[dim])} step={1} min={10}
                  onChange={(e) => handleField(dim, e.target.value)}
                  className="border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </label>
            ))}
          </div>
        </div>

        {/* Rotation */}
        <div className="mb-3">
          <label className="flex flex-col text-xs">
            <span className="text-gray-400 mb-1">Rotation (°)</span>
            <input type="number" value={Math.round(selected.rotation ?? 0)} step={5} min={0} max={360}
              onChange={(e) => handleField('rotation', e.target.value)}
              className="border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400" />
          </label>
        </div>

        {/* Colour – key forces React to remount when selection changes, preventing stale hex value */}
        <div className="mb-3">
          <label className="flex flex-col text-xs">
            <span className="text-gray-400 mb-1">Colour</span>
            <input
              key={`color-${selected.id}`}
              type="color"
              defaultValue={selected.color || '#A0855B'}
              onChange={handleColorChange}
              className="w-full h-8 rounded cursor-pointer border border-gray-200"
            />
          </label>
        </div>

        {/* Texture */}
        <div>
          <p className="text-xs text-gray-400 mb-1">Texture</p>
          <div className="grid grid-cols-2 gap-1">
            {TEXTURES.map((t) => (
              <button key={t.id} onClick={() => handleField('textureId', t.id)}
                className={`text-xs py-1 rounded border transition ${
                  selected.textureId === t.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PropertiesSidebar;
