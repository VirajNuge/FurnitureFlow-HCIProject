import React, { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Stars = ({ rating }) => (
  <span>
    {[1, 2, 3, 4, 5].map((n) => (
      <span key={n} style={{ color: n <= rating ? '#f59e0b' : '#d1d5db', fontSize: '16px' }}>★</span>
    ))}
  </span>
);

const FeedbackDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API}/api/feedback/admin`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading…</div>;
  if (!data) return <div style={{ padding: '2rem' }}>Failed to load feedback.</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Feedback Dashboard</h1>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ background: '#eff6ff', borderRadius: '8px', padding: '1rem 1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700' }}>{data.total}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Total responses</div>
        </div>
        <div style={{ background: '#fef9c3', borderRadius: '8px', padding: '1rem 1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700' }}>{data.averageRating ?? '—'}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Average rating</div>
        </div>
      </div>
      {(data.feedback || []).map((f) => (
        <div key={f._id} style={{ background: '#fff', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '0.75rem', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{f.userId?.name || 'Anonymous'}</strong>
            <Stars rating={f.rating} />
          </div>
          {f.comment && <p style={{ marginTop: '0.4rem', fontSize: '13px', color: '#374151' }}>{f.comment}</p>}
        </div>
      ))}
    </div>
  );
};

export default FeedbackDashboard;
