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
    <div style={{
      padding: '1rem',
      borderRight: '1px solid #e5e7eb',
      width: '200px',
      overflowY: 'auto',
      background: '#fff',
    }}>
      <h3 style={{ marginBottom: '0.75rem', fontSize: '13px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Catalogue
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {CATALOGUE.map((item) => (
          <li
            key={item.type}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('furnitureType', JSON.stringify(item));
              onDragStart && onDragStart(item);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 0.5rem',
              marginBottom: '0.4rem',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              cursor: 'grab',
              background: '#f9fafb',
              userSelect: 'none',
            }}
          >
            <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{item.label}</div>
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>{item.w} × {item.h} cm</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FurnitureSidebar;
