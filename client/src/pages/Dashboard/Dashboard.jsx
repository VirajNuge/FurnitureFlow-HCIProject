import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const cardStyle = {
  background: '#fff', borderRadius: '10px', padding: '1.25rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb',
  display: 'flex', flexDirection: 'column', gap: '0.75rem',
};

const Dashboard = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API}/api/designs`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { setDesigns(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this design?')) return;
    const token = localStorage.getItem('token');
    await fetch(`${API}/api/designs/${id}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
    });
    setDesigns((prev) => prev.filter((d) => d._id !== id));
  };

  if (loading) return (
    <div style={{ padding: '2rem' }}>
      {[1, 2, 3].map((n) => <div key={n} style={{ height: '80px', background: '#f3f4f6', borderRadius: '8px', marginBottom: '1rem' }} />)}
    </div>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700' }}>My Designs</h1>
        <button onClick={() => navigate('/designer')} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
          + New Design
        </button>
      </div>
      {designs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
          <p>No saved designs yet.</p>
          <Link to="/designer">Create your first design →</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {designs.map((d) => (
            <div key={d._id} style={cardStyle}>
              <h3 style={{ fontWeight: '600', fontSize: '15px' }}>{d.name}</h3>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>{new Date(d.updatedAt).toLocaleDateString()}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <button onClick={() => navigate(`/designer?id=${d._id}`)} style={{ flex: 1, padding: '0.4rem', borderRadius: '5px', background: '#eff6ff', border: '1px solid #bfdbfe', cursor: 'pointer', fontSize: '13px' }}>
                  Open
                </button>
                <button onClick={() => handleDelete(d._id)} style={{ padding: '0.4rem 0.75rem', borderRadius: '5px', background: '#fef2f2', border: '1px solid #fecaca', cursor: 'pointer', color: '#ef4444', fontSize: '13px' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
