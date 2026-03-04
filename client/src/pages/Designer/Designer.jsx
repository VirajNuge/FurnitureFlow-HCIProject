import React, { useState } from 'react';
import FurnitureSidebar from '../../components/furniture/FurnitureSidebar';
import Canvas2D from '../../components/canvas2D/Canvas2D';
import Canvas3D from '../../components/canvas3D/Canvas3D';
import DesignerNavbar from '../../components/layout/DesignerNavbar';

const Designer = () => {
  const [view, setView] = useState('2d');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <DesignerNavbar
        view={view}
        onToggleView={() => setView((v) => (v === '2d' ? '3d' : '2d'))}
        onSave={() => console.log('save')}
        onUndo={() => {}}
        onRedo={() => {}}
      />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <FurnitureSidebar />
        {view === '2d' ? <Canvas2D /> : <Canvas3D />}
      </div>
    </div>
  );
};

export default Designer;
