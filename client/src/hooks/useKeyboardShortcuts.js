import { useEffect } from 'react';

const useKeyboardShortcuts = (selectedId, { onDelete, onEscape } = {}) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        e.preventDefault();
        onDelete && onDelete(selectedId);
      }
      if (e.key === 'Escape') {
        onEscape && onEscape();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedId, onDelete, onEscape]);
};

export default useKeyboardShortcuts;
