import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1f2937',
      color: 'white',
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          RoomVista 3D
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/login" style={{ color: 'white' }}>Login</Link>
        <Link to="/register" style={{ color: 'white' }}>Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
