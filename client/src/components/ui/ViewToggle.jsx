import React from 'react';

const ViewToggle = ({ view, onToggle }) => {
  return (
    <div style={{ display: 'inline-flex', borderRadius: '6px', overflow: 'hidden', border: '1px solid #d1d5db' }}>
      <button
        onClick={() => onToggle?.('2d')}
        style={{
          padding: '0.4rem 0.9rem',
          fontSize: '13px',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          background: view === '2d' ? '#3b82f6' : '#f9fafb',
          color: view === '2d' ? '#fff' : '#374151',
        }}
      >
        2D
      </button>
      <button
        onClick={() => onToggle?.('3d')}
        style={{
          padding: '0.4rem 0.9rem',
          fontSize: '13px',
          fontWeight: '600',
          border: 'none',
          borderLeft: '1px solid #d1d5db',
          cursor: 'pointer',
          background: view === '3d' ? '#3b82f6' : '#f9fafb',
          color: view === '3d' ? '#fff' : '#374151',
        }}
      >
        3D
      </button>
    </div>
  );
};

export default ViewToggle;
