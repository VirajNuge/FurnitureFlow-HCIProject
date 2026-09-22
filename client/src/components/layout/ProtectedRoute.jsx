import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const ProtectedRoute = ({ adminOnly = false, children }) => {
  const { user } = useAuthStore();
  if (!user || !localStorage.getItem('token')) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children || <Outlet />;
};

export default ProtectedRoute;
