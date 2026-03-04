import React from 'react';

const MATERIAL_PRESETS = ['Wood', 'Fabric', 'Leather', 'Plastic'];

const PropertiesSidebar = ({ selectedItem, onColorChange, onMaterialChange }) => {
  if (!selectedItem) {
    return (
      <div style={{ width: '220px', padding: '1rem', borderLeft: '1px solid #e5e7eb', background: '#fff' }}>
        <p style={{ fontSize: '13px', color: '#9ca3af' }}>Select a furniture item to edit properties.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '220px', padding: '1rem', borderLeft: '1px solid #e5e7eb', background: '#fff' }}>
      <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '1rem', textTransform: 'capitalize' }}>
        {selectedItem.label}
      </h3>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '0.4rem' }}>Color</label>
        <input
          type="color"
          value={selectedItem.color || '#93c5fd'}
          onChange={(e) => onColorChange && onColorChange(selectedItem.id, e.target.value)}
          style={{ width: '100%', height: '36px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '0.4rem' }}>Material</label>
        <select
          value={selectedItem.material || 'Wood'}
          onChange={(e) => onMaterialChange && onMaterialChange(selectedItem.id, e.target.value)}
          style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px' }}
        >
          {MATERIAL_PRESETS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      <div style={{ fontSize: '12px', color: '#6b7280' }}>
        <div>Width: {selectedItem.w} cm</div>
        <div>Height: {selectedItem.h} cm</div>
        <div>X: {Math.round(selectedItem.x)}</div>
        <div>Y: {Math.round(selectedItem.y)}</div>
      </div>
    </div>
  );
};

export default PropertiesSidebar;
