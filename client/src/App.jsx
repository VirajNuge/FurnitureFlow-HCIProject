import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Toast from './components/ui/Toast';
import HomePage from './pages/Home/HomePage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Designer from './pages/Designer/Designer';
import FeedbackDashboard from './pages/Admin/FeedbackDashboard';

function App() {
  return (
    <Router>
      <Toast />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/designer" element={<Designer />} />
          <Route path="/designer/:id" element={<Designer />} />
        </Route>
        <Route path="/admin/feedback" element={<ProtectedRoute adminOnly><FeedbackDashboard /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
