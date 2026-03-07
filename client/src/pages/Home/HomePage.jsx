import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: '🛋️', title: '2D Floor Planning', desc: 'Drag and drop furniture onto an interactive top-down canvas.' },
  { icon: '🌐', title: '3D Visualisation', desc: 'Instantly preview your room in a realistic 3D environment.' },
  { icon: '💾', title: 'Save & Share', desc: 'Save multiple designs and return to them any time.' },
  { icon: '🎨', title: 'Custom Materials', desc: 'Pick from wood, fabric, leather and concrete textures.' },
];

const HomePage = () => {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* Hero */}
      <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem', background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#1e293b', marginBottom: '1rem', lineHeight: 1.2 }}>
          Design your room in 2D & 3D
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '2rem', maxWidth: '500px' }}>
          FurnitureFlow makes it easy to plan, arrange and visualise your ideal interior space.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/register" style={{ background: '#3b82f6', color: '#fff', padding: '0.8rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '16px' }}>
            Get Started Free
          </Link>
          <Link to="/login" style={{ background: '#fff', color: '#3b82f6', padding: '0.8rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '16px', border: '2px solid #3b82f6' }}>
            Sign In
          </Link>
        </div>
      </section>

      {/* Feature grid */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '700', marginBottom: '2.5rem' }}>Everything you need</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '32px', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '0.4rem' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
