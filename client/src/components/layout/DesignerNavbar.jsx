import React from 'react';

const DesignerNavbar = ({ designName, onNameChange, onSave, isSaving, onUndo, onRedo, canUndo, canRedo, onOpenRoomSetup, onAutoArrange }) => {
  return (
    <header style={{
      height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 1rem', background: '#1e293b', color: '#fff', borderBottom: '1px solid #334155',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontWeight: '700', fontSize: '15px' }}>🛋 FurnitureFlow</span>
        <input aria-label="Design name" value={designName || ''} onChange={(e) => onNameChange?.(e.target.value)} style={{ color: '#fff', background: '#334155', border: '1px solid #475569', borderRadius: '4px', padding: '0.2rem 0.4rem', fontSize: '13px', width: '180px' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button onClick={onOpenRoomSetup} title="Room Setup" style={{ background: '#334155', color: '#fff', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '5px', cursor: 'pointer', fontSize: '13px' }}>
          🏠 Room
        </button>
        <button onClick={onAutoArrange} title="Auto Arrange" style={{ background: '#334155', color: '#fff', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '5px', cursor: 'pointer', fontSize: '13px' }}>
          ⚡ Arrange
        </button>
        <button onClick={onUndo} disabled={!canUndo} title="Undo" aria-label="Undo" style={{ background: '#334155', color: '#cbd5e1', border: 'none', width: '30px', height: '30px', borderRadius: '5px', cursor: canUndo ? 'pointer' : 'not-allowed', opacity: canUndo ? 1 : 0.5 }}>↩</button>
        <button onClick={onRedo} disabled={!canRedo} title="Redo" aria-label="Redo" style={{ background: '#334155', color: '#cbd5e1', border: 'none', width: '30px', height: '30px', borderRadius: '5px', cursor: canRedo ? 'pointer' : 'not-allowed', opacity: canRedo ? 1 : 0.5 }}>↪</button>
        <button onClick={onSave} disabled={isSaving} aria-label="Save design" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '5px', cursor: isSaving ? 'wait' : 'pointer', fontWeight: '600', fontSize: '13px', opacity: isSaving ? 0.7 : 1 }}>
          {isSaving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </header>
  );
};

export default DesignerNavbar;
