import React from 'react';
import ViewToggle from '../ui/ViewToggle';

const DesignerNavbar = ({ designName, onSave, onUndo, onRedo, onToggleView, view, onAutoArrange }) => {
  return (
    <header style={{
      height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 1rem', background: '#1e293b', color: '#fff', borderBottom: '1px solid #334155',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontWeight: '700', fontSize: '15px' }}>🛋 FurnitureFlow</span>
        <span style={{ color: '#94a3b8', fontSize: '13px' }}>{designName || 'Untitled Design'}</span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <ViewToggle view={view} onToggle={onToggleView} />
        <button onClick={onAutoArrange} title="Auto Arrange" style={{ background: '#334155', color: '#fff', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '5px', cursor: 'pointer', fontSize: '13px' }}>
          ⚡ Arrange
        </button>
        <button onClick={onUndo} title="Undo" style={{ background: '#334155', color: '#cbd5e1', border: 'none', width: '30px', height: '30px', borderRadius: '5px', cursor: 'pointer' }}>↩</button>
        <button onClick={onRedo} title="Redo" style={{ background: '#334155', color: '#cbd5e1', border: 'none', width: '30px', height: '30px', borderRadius: '5px', cursor: 'pointer' }}>↪</button>
        <button onClick={onSave} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '5px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          Save
        </button>
      </div>
    </header>
  );
};

export default DesignerNavbar;
