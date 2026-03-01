import React, { useEffect, useState } from 'react';

const FeedbackDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/feedback/admin', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Failed to load feedback.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Feedback Dashboard</h1>
      <p>Total responses: {data.total}</p>
      <p>Average rating: {data.averageRating ?? 'N/A'}</p>
      <ul>
        {(data.feedback || []).map((f) => (
          <li key={f._id} style={{ marginBottom: '0.75rem' }}>
            <strong>{f.userId?.name}</strong> — {f.rating}/5
            <p>{f.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackDashboard;
