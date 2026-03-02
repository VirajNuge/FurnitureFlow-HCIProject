import React, { useState } from 'react';
import useToastStore from '../../store/toastStore';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FeedbackModal = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const addToast = useToastStore((s) => s.addToast);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) { addToast('Please select a rating', 'error'); return; }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ rating, comment }),
      });
      if (!res.ok) throw new Error('Failed to submit');
      addToast('Thank you for your feedback!');
      onClose && onClose();
    } catch {
      addToast('Could not submit feedback', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: '8px', padding: '2rem', width: '400px' }}>
        <h2 style={{ marginBottom: '1rem' }}>Leave Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Rating</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setRating(n)}
                  style={{ width: '36px', height: '36px', background: rating >= n ? '#f59e0b' : '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                  ★
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Comment</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3}
              style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" disabled={loading}>{loading ? 'Submitting…' : 'Submit'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
