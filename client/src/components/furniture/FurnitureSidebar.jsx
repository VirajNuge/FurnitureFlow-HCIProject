const FurnitureSidebar = () => {
  const items = [
    { type: 'Chair', label: 'Chair' },
    { type: 'Table', label: 'Table' },
    { type: 'Sofa', label: 'Sofa' },
  ];

  return (
    <div style={{ padding: '1rem', borderRight: '1px solid #e5e7eb', width: '200px' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: '600' }}>Furniture</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <li key={item.type} style={{
            padding: '0.5rem',
            marginBottom: '0.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            cursor: 'grab',
          }}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FurnitureSidebar;
