import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Owners from '../pages/Owners/Owners';
import Pets from '../pages/Pets/Pets';
import Visits from '../pages/Visits/Visits';
import Veterinarians from '../pages/Veterinarians/Veterinarians';
import AdminRoutes from './AdminRoutes';
import PrivateRoute from '../components/auth/PrivateRoute';

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Register route removed - signup is not needed */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/owners" element={<PrivateRoute><Owners /></PrivateRoute>} />
        <Route path="/pets" element={<PrivateRoute><Pets /></PrivateRoute>} />
        <Route path="/visits" element={<Visits />} />
        <Route path="/veterinarians" element={<Veterinarians />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
  );
}
