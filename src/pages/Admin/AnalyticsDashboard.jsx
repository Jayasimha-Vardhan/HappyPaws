import React from 'react';
import './AnalyticsDashboard.css';

export default function AnalyticsDashboard() {
  // simplified placeholder to avoid runtime failures if chart libraries are missing
  return (
    <div className="analytics-dashboard">
      <h2>Analytics (Placeholder)</h2>
      <p>This section will contain charts and reports for visits, users, and vets.</p>

      <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
        <div className="admin-card" style={{ flex: 1 }}>
          <h4>Visits Overview</h4>
          <p style={{ color: 'var(--muted)' }}>Monthly visits and trends.</p>
        </div>
        <div className="admin-card" style={{ flex: 1 }}>
          <h4>User Growth</h4>
          <p style={{ color: 'var(--muted)' }}>Active users and sign-ups over time.</p>
        </div>
        <div className="admin-card" style={{ flex: 1 }}>
          <h4>Vet Performance</h4>
          <p style={{ color: 'var(--muted)' }}>Ratings and completed visits per vet.</p>
        </div>
      </div>
    </div>
  );
}