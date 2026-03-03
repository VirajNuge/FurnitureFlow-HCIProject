import React from 'react';

const DesignerNavbar = ({ designName, onSave, onUndo, onRedo, onToggleView, view }) => {
  return (
    <header style={{
      height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 1rem', background: '#1e293b', color: '#fff', borderBottom: '1px solid #334155',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontWeight: '700', fontSize: '15px' }}>🛋 FurnitureFlow</span>
        <span style={{ color: '#94a3b8', fontSize: '13px' }}>{designName || 'Untitled Design'}</span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={onUndo} title="Undo">↩</button>
        <button onClick={onRedo} title="Redo">↪</button>
        <button onClick={onToggleView}>{view === '2d' ? '3D View' : '2D View'}</button>
        <button onClick={onSave} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '5px', cursor: 'pointer', fontWeight: '600' }}>
          Save
        </button>
      </div>
    </header>
  );
};

export default DesignerNavbar;
