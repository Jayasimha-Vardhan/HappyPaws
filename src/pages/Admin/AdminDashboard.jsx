import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

function KpiCard({ title, value, delta }) {
  return (
    <div className="admin-card" style={{ flex: 1 }}>
      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>{value}</div>
      {typeof delta !== 'undefined' && (
        <div style={{ marginTop: 6, color: delta >= 0 ? '#16a34a' : '#dc2626' }}>{delta >= 0 ? `+${delta}%` : `${delta}%`} vs last month</div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  // use simple localStorage-backed mock data so this component never crashes
  const users = JSON.parse(localStorage.getItem('app_users') || '[]');
  const pets = JSON.parse(localStorage.getItem('app_pets') || '[]');
  const visits = JSON.parse(localStorage.getItem('app_visits') || '[]');
  const vets = JSON.parse(localStorage.getItem('app_vets') || '[]');

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>

      <p>Welcome to the admin panel — quick overview of the system.</p>

      <div style={{ display: 'flex', gap: 20, marginTop: 18 }}>
        <KpiCard title="Total Users" value={users.length} delta={5.6} />
        <KpiCard title="Total Pets" value={pets.length} delta={-1.4} />
        <KpiCard title="Total Visits" value={visits.length} delta={8.2} />
        <KpiCard title="Veterinarians" value={vets.length} />
      </div>

      <div style={{ display: 'flex', gap: 20, marginTop: 22 }}>
        <div className="admin-card" style={{ flex: 1 }}>
          <h4 style={{ marginTop: 0 }}>Quick Actions</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <Link to="/admin/visits" className="btn btn-primary">Manage Visits</Link>
            <Link to="/admin/users" className="btn btn-outline-secondary">Manage Users</Link>
            <Link to="/admin/veterinarians" className="btn btn-outline-secondary">Manage Vets</Link>
          </div>
        </div>

        <div className="admin-card" style={{ width: 320 }}>
          <h4 style={{ marginTop: 0 }}>Recent Activity</h4>
          <p style={{ marginTop: 8, color: 'var(--muted)' }}>No recent activity available — this is a placeholder.</p>
        </div>
      </div>
    </div>
  );
}
