import React, { useState } from 'react';
import useToastStore from '../../store/toastStore';
import api from '../../api/apiClient';

const FeedbackModal = ({ isOpen, onClose, designId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const addToast = useToastStore((s) => s.addToast);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (rating === 0) { setError('Please select a star rating.'); return; }
    if (comment.trim().length < 5) { setError('Comment must be at least 5 characters.'); return; }
    setSubmitting(true);
    try {
      await api.post('/feedback', { designId, rating, comment });
      addToast('Feedback submitted!', 'success');
      setRating(0); setComment('');
      onClose();
    } catch {
      setError('Could not submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-fadeIn"
        style={{ animation: 'fadeInUp 0.2s ease-out' }}
      >
        <h2 id="feedback-title" className="text-xl font-semibold text-gray-800 mb-4">
          Leave Feedback
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex gap-2 mb-4" role="group" aria-label="Star rating">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                className={`text-3xl transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${s <= rating ? 'text-amber-400' : 'text-gray-300'}`}
                aria-label={`${s} star${s > 1 ? 's' : ''}`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            rows={4}
            placeholder="Share your thoughts about this design…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
          />
          <p className="text-xs text-gray-400 text-right mt-1">{comment.length}/500</p>

          {error && (
            <p role="alert" className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-sm rounded-lg bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {submitting ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
