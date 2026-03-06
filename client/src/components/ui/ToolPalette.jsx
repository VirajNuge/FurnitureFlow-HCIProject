import React from 'react';

const TOOLS = [
  { id: 'select', icon: '↖', label: 'Select' },
  { id: 'move', icon: '✥', label: 'Move' },
  { id: 'rotate', icon: '↻', label: 'Rotate' },
  { id: 'delete', icon: '🗑', label: 'Delete' },
];

const ToolPalette = ({ activeTool, onToolChange }) => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '0.35rem',
      padding: '0.5rem', background: '#fff', borderRight: '1px solid #e5e7eb',
      width: '52px', alignItems: 'center',
    }}>
      {TOOLS.map((t) => (
        <button
          key={t.id}
          title={t.label}
          onClick={() => onToolChange && onToolChange(t.id)}
          style={{
            width: '38px', height: '38px', borderRadius: '6px', border: 'none',
            fontSize: '16px', cursor: 'pointer',
            background: activeTool === t.id ? '#eff6ff' : 'transparent',
            outline: activeTool === t.id ? '2px solid #3b82f6' : 'none',
          }}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
};

export default ToolPalette;
