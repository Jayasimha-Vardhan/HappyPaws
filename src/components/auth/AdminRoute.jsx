import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  try {
    const stored = localStorage.getItem('user');
    if (!stored) return <Navigate to="/login" replace />;

    const user = JSON.parse(stored);
    if (!user) return <Navigate to="/" replace />;

    // accept role case-insensitively (db.json may use 'ADMIN')
    const role = (user.role || '').toString().toLowerCase();
    if (role !== 'admin') {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (e) {
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
