import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../pages/Admin/AdminLayout';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import OwnersAdmin from '../pages/Admin/OwnersAdmin';
import PetsAdmin from '../pages/Admin/PetsAdmin';
import VisitsAdmin from '../pages/Admin/VisitsAdmin';
import VetsAdmin from '../pages/Admin/VetsAdmin';
import UsersAdmin from '../pages/Admin/UsersAdmin';
import AuditLogs from '../pages/Admin/AuditLogs';

function RequireAdmin({ children }) {
  try {
    const raw = localStorage.getItem('user');
    const user = raw ? JSON.parse(raw) : null;
    if (!user || !(user.role || '').toLowerCase().includes('admin')) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  } catch (e) {
    return <Navigate to="/login" replace />;
  }
}

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="owners" element={<OwnersAdmin />} />
        <Route path="pets" element={<PetsAdmin />} />
        <Route path="visits" element={<VisitsAdmin />} />
        <Route path="veterinarians" element={<VetsAdmin />} />
        <Route path="users" element={<UsersAdmin />} />
        <Route path="audit-logs" element={<AuditLogs />} />
      </Route>
    </Routes>
  );
}

