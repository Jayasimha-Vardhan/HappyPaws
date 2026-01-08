import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  useEffect(() => {
    if (location && location.state && location.state.justLoggedIn) {
      setShowToast(true);
      const t = setTimeout(() => setShowToast(false), 4200);
      return () => clearTimeout(t);
    }
  }, [location]);

  if (!user) return <div>Loading...</div>;

  const userName = user.name || 'User';
  const userRole = (user.role || 'Customer').toString();
  const isVet = userRole.toLowerCase() === 'vet' || userRole.toLowerCase() === 'veterinarian';

  return (
    <div className="dashboard-page">
      {showToast && (
        <div className="welcome-toast" role="status">
          <h4>Welcome back!</h4>
          <p>You have successfully logged in.</p>
        </div>
      )}
      <main className="dashboard-main container">
        <div className="dashboard-top">
          <span className="role-pill">{userRole}</span>
        </div>
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-welcome">Welcome back, <strong>{userName}!</strong> <span className="role-badge">{userRole}</span></p>
          </div>
          <div className="dashboard-user">
            <span>{userName}</span>
            <span className="role-badge-pill">{userRole}</span>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-header">
              <h3>My Pets</h3>
              <span className="stat-icon">🐾</span>
            </div>
            <div className="stat-value">0</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>My Visits</h3>
              <span className="stat-icon">📅</span>
            </div>
            <div className="stat-value">0</div>
          </div>
        </div>

        <div className="dashboard-content">
          {isVet ? (
            <section className="vet-section">
              <div className="section-header">
                <h2>Veterinarian Profile</h2>
              </div>
              <div className="vet-card">
                <div className="vet-row">
                  <div>
                    <h3>{userName}</h3>
                    <p className="muted">{user.specialty || 'General'} • {user.clinic || 'Clinic'}</p>
                    <p className="muted">Contact: {user.phone || '—'} • {user.email}</p>
                  </div>
                </div>
                <div className="vet-stats">
                  <div className="stat-card">
                    <h4>Upcoming Visits</h4>
                    <div className="stat-value">0</div>
                  </div>
                  <div className="stat-card">
                    <h4>Patients Today</h4>
                    <div className="stat-value">0</div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <>
              <section className="pets-section">
                <div className="section-header">
                  <h2>My Pets</h2>
                  <a href="#">View All →</a>
                </div>
                <div className="pets-list">
                  <div className="empty-state">
                    <span className="empty-icon">🐾</span>
                    <p>No pets registered yet</p>
                  </div>
                </div>
              </section>

              <aside className="dashboard-sidebar">
                <div className="quick-info">
                  <div className="qi-header">
                    <span>⏰</span>
                    <h3>Quick Info</h3>
                  </div>
                  <div className="qi-content">
                    <p className="qi-title">Need to schedule a visit?</p>
                    <p className="qi-desc">Contact our clinic to book an appointment for your pet.</p>
                    <a href="#" className="qi-btn">View My Visits</a>
                  </div>
                </div>
              </aside>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
