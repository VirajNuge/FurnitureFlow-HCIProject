import React, { useState } from 'react';

const RoomSetupModal = ({ initial = {}, onSave, onClose }) => {
  const [width, setWidth] = useState(initial.width || 500);
  const [depth, setDepth] = useState(initial.depth || 400);
  const [wallHeight, setWallHeight] = useState(initial.wallHeight || 280);
  const [floorTexture, setFloorTexture] = useState(initial.floorTexture || 'Wood');

  const handleSave = () => {
    onSave && onSave({ width: Number(width), depth: Number(depth), wallHeight: Number(wallHeight), floorTexture });
    onClose && onClose();
  };

  const fieldStyle = { width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', marginTop: '0.25rem', fontSize: '14px' };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: '10px', padding: '2rem', width: '380px' }}>
        <h2 style={{ marginBottom: '1.25rem' }}>Room Setup</h2>
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ fontSize: '13px', fontWeight: '600' }}>Width (cm)</label>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} style={fieldStyle} />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ fontSize: '13px', fontWeight: '600' }}>Depth (cm)</label>
          <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} style={fieldStyle} />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ fontSize: '13px', fontWeight: '600' }}>Wall Height (cm)</label>
          <input type="number" value={wallHeight} onChange={(e) => setWallHeight(e.target.value)} style={fieldStyle} />
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '13px', fontWeight: '600' }}>Floor Texture</label>
          <select value={floorTexture} onChange={(e) => setFloorTexture(e.target.value)} style={fieldStyle}>
            {['Wood', 'Fabric', 'Leather', 'Plastic'].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default RoomSetupModal;
