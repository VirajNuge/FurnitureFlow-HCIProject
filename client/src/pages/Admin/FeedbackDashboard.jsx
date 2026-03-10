import React, { useEffect, useState } from 'react';
import { getFeedback } from '../../api/designerApi';

const FeedbackDashboard = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    getFeedback()
      .then(({ data }) => setFeedback(Array.isArray(data) ? data : []))
      .catch(() => setError('Failed to load feedback.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = feedback.filter((f) => {
    const d = new Date(f.createdAt);
    if (dateFrom && d < new Date(dateFrom)) return false;
    if (dateTo && d > new Date(dateTo)) return false;
    return true;
  });

  const avgRating =
    filtered.length > 0
      ? (filtered.reduce((sum, f) => sum + f.rating, 0) / filtered.length).toFixed(1)
      : '—';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Loading feedback…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Feedback Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-xs text-gray-500 mb-1">From</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">To</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm" />
        </div>
        <div className="self-end">
          <button onClick={() => { setDateFrom(''); setDateTo(''); }}
            className="text-sm text-indigo-600 hover:underline">
            Clear
          </button>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        <span className="font-medium">{filtered.length}</span> entries &nbsp;|&nbsp;
        Average rating: <span className="font-medium">{avgRating}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 text-sm py-16 border-2 border-dashed border-gray-200 rounded-xl">
          No feedback found for the selected date range.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((f) => (
            <div key={f._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-amber-400 text-lg">{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</span>
                <span className="text-xs text-gray-400">{new Date(f.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-gray-700">{f.comment}</p>
              {f.userId?.name && (
                <p className="text-xs text-gray-400 mt-1">— {f.userId.name}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackDashboard;
