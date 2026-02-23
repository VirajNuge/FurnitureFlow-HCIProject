import Navbar from './Navbar';

const PageWrapper = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#ffffff' }}>
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
