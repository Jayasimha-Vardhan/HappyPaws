import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import '../../components/layout/Navbar.css';
import './Admin.css';
import AdminNotifications from '../../components/notifications/AdminNotifications';
import ThemeToggle from '../../components/common/ThemeToggle';

import { ReactComponent as DashboardIcon } from '../../assets/images/icons/dashboard.svg';
import { ReactComponent as OwnersIcon } from '../../assets/images/icons/owners.svg';
import { ReactComponent as PetsIcon } from '../../assets/images/icons/pets.svg';
import { ReactComponent as VisitsIcon } from '../../assets/images/icons/visits.svg';
import { ReactComponent as VetIcon } from '../../assets/images/icons/veterinarian.svg';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const stored = localStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : null;
  const [theme, setTheme] = useState(localStorage.getItem('adminTheme') || 'light');

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('admin-dark');
    else root.classList.remove('admin-dark');
    localStorage.setItem('adminTheme', theme);
  }, [theme]);

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/login');
  }

  return (
    <div className={`admin-page ${collapsed ? 'collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <div className="admin-brand">
            <div className="brand-logo">HP</div>
            <div className="brand-text">HappyPaws Admin</div>
          </div>
          <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
            {collapsed ? '»' : '«'}
          </button>
        </div>

        <div className="admin-sidebar-search">
          <input placeholder="Search..." aria-label="Search admin" />
        </div>

        <div className="admin-profile">
          <div className="avatar">JD</div>
          <div className="profile-info">
            <div className="name">John Doe</div>
            <div className="role">Administrator</div>
          </div>
        </div>

        <nav className="admin-sidenav">
          <div className="sidenav-section">Navigation</div>
          <NavLink to="/admin/dashboard">
            <DashboardIcon className="nav-icon" aria-hidden="true" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/users">
            <OwnersIcon className="nav-icon" aria-hidden="true" />
            <span>Owners</span>
          </NavLink>

          <NavLink to="/admin/pets">
            <PetsIcon className="nav-icon" aria-hidden="true" />
            <span>Pets</span>
          </NavLink>

          <NavLink to="/admin/visits">
            <VisitsIcon className="nav-icon" aria-hidden="true" />
            <span>Visits</span>
          </NavLink>

          <NavLink to="/admin/veterinarians">
            <VetIcon className="nav-icon" aria-hidden="true" />
            <span>Veterinarians</span>
          </NavLink>

          <NavLink to="/admin/roles">Roles</NavLink>
          <NavLink to="/admin/analytics">Analytics <span className="badge new">NEW</span></NavLink>
          <NavLink to="/admin/audit-logs">Audit Logs</NavLink>

          <div className="sidenav-section">Management</div>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/pets">Pets</NavLink>
          <NavLink to="/admin/visits">Visits</NavLink>
          <NavLink to="/admin/veterinarians">Vets</NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <div className="user-name">{user ? user.name : 'Guest'}</div>
            <div className="user-role">{user ? (user.role || '').toString() : ''}</div>
          </div>
          <div className="admin-actions">
            <button className="btn btn-sm btn-outline-secondary" onClick={logout}>Logout</button>
          </div>
        </div>
      </aside>

      <div className="admin-main-area">
        <header className="admin-top">
          <div />
          <div className="admin-header-actions">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <div className="notifications-inline">
              <AdminNotifications />
            </div>
          </div>
        </header>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
