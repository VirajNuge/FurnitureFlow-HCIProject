import React from 'react';
import useToastStore from '../../store/toastStore';

const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 9999 }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => removeToast(t.id)}
          style={{
            marginTop: '0.5rem',
            padding: '0.75rem 1rem',
            background: t.type === 'error' ? '#ef4444' : '#22c55e',
            color: '#fff',
            borderRadius: '6px',
            cursor: 'pointer',
            minWidth: '200px',
          }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
