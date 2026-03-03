import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API}/api/designs`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => { setDesigns(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`${API}/api/designs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setDesigns((prev) => prev.filter((d) => d._id !== id));
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading designs…</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1>My Designs</h1>
        <button onClick={() => navigate('/designer')}>+ New Design</button>
      </div>
      {designs.length === 0 ? (
        <p>No saved designs yet. <Link to="/designer">Create one</Link></p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {designs.map((d) => (
            <li key={d._id} style={{ marginBottom: '0.75rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span>{d.name}</span>
              <button onClick={() => navigate(`/designer?id=${d._id}`)}>Load</button>
              <button onClick={() => handleDelete(d._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
