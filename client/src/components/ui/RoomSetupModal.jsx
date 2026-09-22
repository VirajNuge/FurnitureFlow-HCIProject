import React, { useEffect, useRef, useState } from 'react';

const RoomSetupModal = ({ initial = {}, onSave, onClose }) => {
  const [width, setWidth] = useState(initial.width || 500);
  const [depth, setDepth] = useState(initial.depth || 400);
  const [height, setHeight] = useState(initial.height || 280);
  const [wallColor, setWallColor] = useState(initial.wallColor || '#f5f0e8');
  const [floorTexture, setFloorTexture] = useState(initial.floorTexture || 'wood');
  const [error, setError] = useState('');
  const firstInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current?.focus();
    const handleKeyDown = (event) => event.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSave = () => {
    if ([width, depth, height].some((value) => !Number.isFinite(Number(value)) || Number(value) <= 0)) {
      setError('All room dimensions must be positive numbers.');
      return;
    }
    setError('');
    onSave && onSave({ width: Number(width), depth: Number(depth), height: Number(height), wallColor, floorTexture });
    onClose && onClose();
  };

  const fieldStyle = { width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', marginTop: '0.25rem', fontSize: '14px' };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="room-setup-title" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: '10px', padding: '2rem', width: '380px', maxWidth: 'calc(100vw - 2rem)' }}>
        <h2 id="room-setup-title" style={{ marginBottom: '1.25rem' }}>Room Setup</h2>
        <div style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="room-width" style={{ fontSize: '13px', fontWeight: '600' }}>Width (cm)</label>
          <input ref={firstInputRef} id="room-width" type="number" min="100" max="5000" value={width} onChange={(e) => setWidth(e.target.value)} style={fieldStyle} />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="room-depth" style={{ fontSize: '13px', fontWeight: '600' }}>Depth (cm)</label>
          <input id="room-depth" type="number" min="100" max="5000" value={depth} onChange={(e) => setDepth(e.target.value)} style={fieldStyle} />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="room-height" style={{ fontSize: '13px', fontWeight: '600' }}>Wall Height (cm)</label>
          <input id="room-height" type="number" min="100" max="1000" value={height} onChange={(e) => setHeight(e.target.value)} style={fieldStyle} />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="wall-color" style={{ fontSize: '13px', fontWeight: '600' }}>Wall Colour</label>
          <input id="wall-color" type="color" value={wallColor} onChange={(e) => setWallColor(e.target.value)} style={{ ...fieldStyle, height: '2.5rem', padding: '0.15rem' }} />
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="floor-texture" style={{ fontSize: '13px', fontWeight: '600' }}>Floor Texture</label>
          <select id="floor-texture" value={floorTexture} onChange={(e) => setFloorTexture(e.target.value)} style={fieldStyle}>
            {['wood', 'fabric', 'leather', 'plastic', 'metal'].map((t) => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>
        {error && <p role="alert" style={{ color: '#dc2626', fontSize: '13px', marginBottom: '1rem' }}>{error}</p>}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="button" onClick={handleSave} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default RoomSetupModal;
