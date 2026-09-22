import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/apiClient';
import Navbar from '../../components/layout/Navbar';

const cardStyle = {
  background: '#fff', borderRadius: '10px', padding: '1.25rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb',
  display: 'flex', flexDirection: 'column', gap: '0.75rem',
};

const SkeletonCard = () => (
  <div style={{ ...cardStyle, animation: 'pulse 1.5s ease-in-out infinite' }}>
    <div style={{ height: '18px', background: '#e5e7eb', borderRadius: '4px', width: '60%' }} />
    <div style={{ height: '12px', background: '#f3f4f6', borderRadius: '4px', width: '40%' }} />
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <div style={{ flex: 1, height: '32px', background: '#eff6ff', borderRadius: '5px' }} />
      <div style={{ width: '70px', height: '32px', background: '#fef2f2', borderRadius: '5px' }} />
    </div>
  </div>
);

const Dashboard = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/designs')
      .then(({ data }) => setDesigns(Array.isArray(data) ? data : data?.designs || []))
      .catch(() => setError('Unable to load your designs.'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this design?')) return;
    try {
      await api.delete(`/designs/${id}`);
      setDesigns((prev) => prev.filter((d) => d._id !== id));
    } catch {
      setError('Unable to delete this design.');
    }
  };

  return (
    <div><Navbar /><main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700' }}>My Designs</h1>
        <button onClick={() => navigate('/designer')} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
          + New Design
        </button>
      </div>
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {[1, 2, 3, 4].map((n) => <SkeletonCard key={n} />)}
        </div>
      ) : error ? (
        <div role="alert" style={{ textAlign: 'center', padding: '4rem', color: '#dc2626' }}>{error}</div>
      ) : designs.length === 0 ? (
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
                <button onClick={() => navigate(`/designer/${d._id}`)} style={{ flex: 1, padding: '0.4rem', borderRadius: '5px', background: '#eff6ff', border: '1px solid #bfdbfe', cursor: 'pointer', fontSize: '13px' }}>
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
    </main></div>
  );
};

export default Dashboard;
