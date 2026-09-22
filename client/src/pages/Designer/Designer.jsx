import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Canvas2D from '../../components/canvas2D/Canvas2D';
import Canvas3D from '../../components/canvas3D/Canvas3D';
import FurnitureSidebar from '../../components/furniture/FurnitureSidebar';
import DesignerNavbar from '../../components/layout/DesignerNavbar';
import PropertiesSidebar from '../../components/ui/PropertiesSidebar';
import Toolbar from '../../components/ui/Toolbar';
import ViewToggle from '../../components/ui/ViewToggle';
import RoomSetupModal from '../../components/ui/RoomSetupModal';
import { useDesignStore } from '../../store/designStore';
import useToastStore from '../../store/toastStore';
import { getDesign } from '../../api/designerApi';
import { autoArrange } from '../../utils/autoArrange';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

const Designer = () => {
  const { id } = useParams();
  const [view, setView] = useState('2d');
  const [showRoomSetup, setShowRoomSetup] = useState(false);
  const [loading, setLoading] = useState(Boolean(id));
  const [loadError, setLoadError] = useState('');
  const addToast = useToastStore((s) => s.addToast);
  const {
    room, furniture, selectedId, designName, isSaving, history, future,
    setRoom, setFurniture, setDesignName, resetDesign, saveDesign, replaceFurniture,
    selectItem, removeFurniture, rotateFurniture, duplicateFurniture,
    undo, redo,
  } = useDesignStore();

  useEffect(() => {
    let active = true;
    if (!id) {
      resetDesign();
      setLoading(false);
      return () => { active = false; };
    }
    setLoading(true);
    setLoadError('');
    getDesign(id)
      .then(({ data }) => {
        if (!active) return;
        setDesignName(data.name);
        setRoom(data.room);
        setFurniture((data.furniture || []).map((item) => ({
          ...item,
          id: item.id || item._id || crypto.randomUUID(),
          depth: item.depth ?? item.height ?? 80,
          height: item.height ?? 80,
        })));
      })
      .catch((error) => {
        if (active) setLoadError(error.response?.data?.message || 'Unable to load this design.');
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id, resetDesign, setDesignName, setFurniture, setRoom]);

  useKeyboardShortcuts(selectedId, {
    onDelete: removeFurniture,
    onEscape: () => selectItem(null),
  });

  const handleSave = async () => {
    try {
      await saveDesign(designName.trim() || 'Untitled Design');
      addToast('Design saved.', 'success');
    } catch (error) {
      addToast(error.message || 'Unable to save design.', 'error');
    }
  };

  const handleAutoArrange = () => {
    const result = autoArrange(furniture, room);
    replaceFurniture(result.items);
    addToast(result.overflow ? `${result.overflow} item(s) could not fit inside the room.` : 'Furniture arranged.', result.overflow ? 'error' : 'success');
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-gray-500" role="status">Loading design…</div>;
  if (loadError) return <div className="h-screen flex flex-col items-center justify-center gap-3 text-red-600" role="alert"><p>{loadError}</p><button className="btn btn-secondary" onClick={() => window.location.assign('/dashboard')}>Back to dashboard</button></div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <DesignerNavbar designName={designName} onNameChange={setDesignName} onSave={handleSave} isSaving={isSaving} onUndo={undo} onRedo={redo} canUndo={history.length > 0} canRedo={future.length > 0} onOpenRoomSetup={() => setShowRoomSetup(true)} onAutoArrange={handleAutoArrange} />
      <div className="flex flex-1 overflow-hidden min-w-0">
        <FurnitureSidebar />
        <div className="flex-1 flex flex-col overflow-hidden relative min-w-0">
          <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
            <Toolbar selectedId={selectedId} onDelete={removeFurniture} onRotate={rotateFurniture} onDuplicate={duplicateFurniture} />
            <ViewToggle view={view} onToggle={setView} />
          </div>
          <div className="flex-1 overflow-hidden">{view === '2d' ? <Canvas2D /> : <Canvas3D />}</div>
        </div>
        <PropertiesSidebar />
      </div>
      {showRoomSetup && <RoomSetupModal initial={room} onSave={(config) => { setRoom(config); setShowRoomSetup(false); }} onClose={() => setShowRoomSetup(false)} />}
    </div>
  );
};

export default Designer;
