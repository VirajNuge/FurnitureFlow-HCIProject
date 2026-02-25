import React from 'react';

const CATALOGUE = [
  { type: 'chair', label: 'Chair', icon: '🪑', w: 60, h: 60 },
  { type: 'table', label: 'Table', icon: '🪵', w: 100, h: 60 },
  { type: 'sofa', label: 'Sofa', icon: '🛋️', w: 140, h: 70 },
  { type: 'bed', label: 'Bed', icon: '🛏️', w: 120, h: 200 },
  { type: 'shelf', label: 'Shelf', icon: '📚', w: 80, h: 30 },
  { type: 'lamp', label: 'Lamp', icon: '💡', w: 30, h: 30 },
];

const FurnitureSidebar = ({ onDragStart }) => {
  return (
    <div style={{ padding: '1rem', borderRight: '1px solid #e5e7eb', width: '200px', overflowY: 'auto' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
        Furniture Catalogue
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {CATALOGUE.map((item) => (
          <li
            key={item.type}
            draggable
            onDragStart={() => onDragStart && onDragStart(item)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              cursor: 'grab',
              background: '#f9fafb',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            <span style={{ fontSize: '13px', color: '#374151' }}>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FurnitureSidebar;
