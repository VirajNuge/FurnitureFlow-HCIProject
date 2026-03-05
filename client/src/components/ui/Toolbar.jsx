import React from 'react';

const btnStyle = (disabled) => ({
  padding: '0.4rem 0.8rem', fontSize: '13px', borderRadius: '5px',
  border: '1px solid #e5e7eb', cursor: disabled ? 'not-allowed' : 'pointer',
  background: disabled ? '#f9fafb' : '#fff', color: disabled ? '#9ca3af' : '#374151',
  display: 'flex', alignItems: 'center', gap: '0.3rem',
});

const Toolbar = ({ selectedId, onDelete, onRotate, onDuplicate }) => {
  const disabled = !selectedId;

  return (
    <div style={{
      display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem',
      background: '#fff', borderBottom: '1px solid #e5e7eb', alignItems: 'center',
    }}>
      <button style={btnStyle(disabled)} onClick={() => !disabled && onDelete(selectedId)} disabled={disabled}>
        🗑 Delete
      </button>
      <button style={btnStyle(disabled)} onClick={() => !disabled && onRotate(selectedId, 90)} disabled={disabled}>
        🔄 Rotate
      </button>
      <button style={btnStyle(disabled)} onClick={() => !disabled && onDuplicate(selectedId)} disabled={disabled}>
        📋 Duplicate
      </button>
    </div>
  );
};

export default Toolbar;
