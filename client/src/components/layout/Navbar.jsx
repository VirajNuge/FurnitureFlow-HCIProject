import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav role="navigation" aria-label="Main navigation" style={{ height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 100 }}>
      <Link to="/" style={{ fontWeight: '800', fontSize: '18px', color: '#1e293b', textDecoration: 'none' }}>
        🛋 FurnitureFlow
      </Link>
      <div role="menubar" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <Link role="menuitem" to="/dashboard" style={{ fontSize: '14px', color: '#374151', textDecoration: 'none' }}>Dashboard</Link>
            <Link role="menuitem" to="/designer" style={{ fontSize: '14px', color: '#374151', textDecoration: 'none' }}>New Design</Link>
            <button
              role="menuitem"
              onClick={handleLogout}
              aria-label="Log out"
              style={{ background: 'none', border: '1px solid #e5e7eb', padding: '0.3rem 0.75rem', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', color: '#374151' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link role="menuitem" to="/login" style={{ fontSize: '14px', color: '#374151', textDecoration: 'none' }}>Sign In</Link>
            <Link role="menuitem" to="/register" style={{ background: '#3b82f6', color: '#fff', padding: '0.4rem 1rem', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
