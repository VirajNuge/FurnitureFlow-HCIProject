import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const inputStyle = {
  width: '100%', padding: '0.6rem 0.75rem', marginTop: '0.25rem',
  border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px',
  outline: 'none',
};

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login({ email: form.email, password: form.password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2.5rem', width: '100%', maxWidth: '420px' }}>
        <h2 style={{ marginBottom: '0.25rem', fontSize: '24px', fontWeight: '700' }}>Welcome back</h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '14px' }}>Sign in to your FurnitureFlow account</p>
        {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '13px', fontWeight: '600' }}>Email</label>
            <input style={inputStyle} name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '13px', fontWeight: '600' }}>Password</label>
            <input style={inputStyle} name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.7rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '13px', color: '#6b7280' }}>
          No account? <Link to="/register" style={{ color: '#3b82f6' }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
