import { Link } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'New Design', path: '/designer/new' },
  ];

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#f3f4f6',
      padding: '2rem 1rem',
      borderRight: '1px solid #e5e7eb',
      minHeight: '100vh',
    }}>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.path} style={{
              display: 'block',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              color: '#4b5563',
              textDecoration: 'none',
            }}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
