import React, { useState, useEffect } from 'react';
import Canvas2D from '../../components/canvas2D/Canvas2D';
import Canvas3D from '../../components/canvas3D/Canvas3D';
import FurnitureSidebar from '../../components/furniture/FurnitureSidebar';
import DesignerNavbar from '../../components/layout/DesignerNavbar';
import PropertiesSidebar from '../../components/ui/PropertiesSidebar';
import Toolbar from '../../components/ui/Toolbar';
import ViewToggle from '../../components/ui/ViewToggle';
import RoomSetupModal from '../../components/ui/RoomSetupModal';
import { useDesignStore } from '../../store/designStore';
import { useParams } from 'react-router-dom';
import { getDesign } from '../../api/designerApi';

const Designer = () => {
  const { id } = useParams();
  const [view, setView] = useState('2d');
  const [showRoomSetup, setShowRoomSetup] = useState(false);
  const { room, setRoom, setFurniture, setDesignName } = useDesignStore();

  useEffect(() => {
    if (id) {
      getDesign(id)
        .then(({ data }) => {
          setDesignName(data.name);
          setRoom(data.room);
          setFurniture(data.furniture);
        })
        .catch(console.error);
    }
  }, [id]);

  const handleRoomSave = (roomConfig) => {
    setRoom(roomConfig);
    setShowRoomSetup(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <DesignerNavbar onOpenRoomSetup={() => setShowRoomSetup(true)} />

      <div className="flex flex-1 overflow-hidden">
        <FurnitureSidebar />

        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
            <Toolbar />
            <ViewToggle view={view} setView={setView} />
          </div>

          <div className="flex-1 overflow-hidden">
            {view === '2d' ? <Canvas2D /> : <Canvas3D />}
          </div>
        </div>

        <PropertiesSidebar />
      </div>

      {showRoomSetup && (
        <RoomSetupModal
          initialRoom={room}
          onSave={handleRoomSave}
          onClose={() => setShowRoomSetup(false)}
        />
      )}
    </div>
  );
};

export default Designer;
