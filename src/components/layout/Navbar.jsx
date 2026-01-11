import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch (e) { setUser(null); }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setShowDropdown(false);
    setMobileOpen(false);
    navigate('/');
  };

  const goProtected = (e, path) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: path } });
      return;
    }
    navigate(path);
  };

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const isAuthenticated = !!user && !!token;
  const pathname = location?.pathname || '/';
  const isLoginRoute = pathname === '/login';
  const isHome = pathname === '/';

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <img src={process.env.PUBLIC_URL + '/HappyPaws Logo.png'} alt="HappyPaws" className="logo-img" />
        </Link>
        {isLoginRoute && (
          <div className="nav-back-link-wrap">
            <Link to="/" className="nav-back-link">← Back to Home</Link>
          </div>
        )}
      </div>

      {isLoginRoute ? (
        // Login route: show logo only (center + right empty)
        <>
          <nav className="navbar-center" />
          <div className="navbar-right" />
        </>
      ) : isAuthenticated && !isHome ? (
        // Authenticated navbar: dashboard, role links, logout
        <>
          <nav className="navbar-center">
            <Link to="/dashboard">Dashboard</Link>
            <a
              href="/admin/dashboard"
              onClick={(e) => {
                e.preventDefault();
                if ((user?.role || '').toLowerCase().includes('admin')) navigate('/admin');
                else navigate('/dashboard', { state: { message: 'Admin access requires admin role' } });
              }}
            >
              Admin
            </a>
            <Link to="/owners">Owners</Link>
            <Link to="/pets">Pets</Link>
            <Link to="/visits">Visits</Link>
            <Link to="/veterinarians">Veterinarians</Link>
          </nav>

          <div className="navbar-right">
            <div className="user-menu">
              <button className="user-btn" onClick={() => setShowDropdown((s) => !s)}>
                <span>👤</span>
                <span>{user?.name}</span>
                <span className="role-badge">{user?.role || 'Customer'}</span>
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="dropdown-name">{user?.email}</div>
                    <div className="dropdown-role">🛡️ Role: {user?.role || 'Customer'}</div>
                  </div>
                  <button className="dropdown-signout" onClick={handleSignOut}>
                    📤 Sign Out
                  </button>
                </div>
              )}
            </div>
            <button className="mobile-toggle" onClick={() => setMobileOpen((s) => !s)} aria-label="Toggle menu">☰</button>
          </div>
        </>
      ) : (
        // Public navbar (landing page and other public views)
        <>
          <nav className="navbar-center">
            <Link to="/">Home</Link>

            <a
              href="/#about"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname === '/') {
                  const id = 'about';
                  const el = document.getElementById(id);
                  if (el) {
                    const nav = document.querySelector('.navbar');
                    const offset = nav ? nav.offsetHeight : 0;
                    const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 8;
                    window.scrollTo({ top, behavior: 'smooth' });
                    return;
                  }
                }
                navigate('/', { state: { scrollTo: 'about' } });
              }}
            >
              About
            </a>

            <a
              href="/#features"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname === '/') {
                  const id = 'features';
                  const el = document.getElementById(id);
                  if (el) {
                    const nav = document.querySelector('.navbar');
                    const offset = nav ? nav.offsetHeight : 0;
                    const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 8;
                    window.scrollTo({ top, behavior: 'smooth' });
                    return;
                  }
                }
                navigate('/', { state: { scrollTo: 'features' } });
              }}
            >
              Features
            </a>

            <a
              href="/#how"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname === '/') {
                  const id = 'how';
                  const el = document.getElementById(id);
                  if (el) {
                    const nav = document.querySelector('.navbar');
                    const offset = nav ? nav.offsetHeight : 0;
                    const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 8;
                    window.scrollTo({ top, behavior: 'smooth' });
                    return;
                  }
                }
                navigate('/', { state: { scrollTo: 'how' } });
              }}
            >
              How It Works ⭐
            </a>
          </nav>

          <div className="navbar-right">
            <button type="button" className="sign-in" onClick={() => { setMobileOpen(false); navigate('/login'); }}>Sign In</button>
            <button type="button" className="get-started" onClick={() => { setMobileOpen(false); navigate('/login'); }}>Get Started</button>
            <button className="mobile-toggle" onClick={() => setMobileOpen((s) => !s)} aria-label="Toggle menu">☰</button>
          </div>
        </>
      )}
      {/* Mobile menu overlay */}
      {mobileOpen && !isLoginRoute && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          {isAuthenticated && !isHome ? (
            <div className="mobile-list">
              <a onClick={() => { setMobileOpen(false); navigate('/dashboard'); }}>Dashboard</a>
              <a onClick={(e) => { e?.preventDefault(); setMobileOpen(false); navigate('/owners'); }}>Owners</a>
              <a onClick={(e) => { e?.preventDefault(); setMobileOpen(false); navigate('/pets'); }}>Pets</a>
              <a onClick={(e) => { e?.preventDefault(); setMobileOpen(false); navigate('/visits'); }}>Visits</a>
              <a onClick={(e) => { e?.preventDefault(); setMobileOpen(false); navigate('/veterinarians'); }}>Veterinarians</a>
              <button className="mobile-signout" onClick={handleSignOut}>Sign Out</button>
            </div>
          ) : (
            <div className="mobile-list">
              <a onClick={(e) => { e?.preventDefault(); setMobileOpen(false); if (location.pathname === '/') { const id='about'; const el=document.getElementById(id); if(el){ const nav=document.querySelector('.navbar'); const offset = nav?nav.offsetHeight:0; const top=el.getBoundingClientRect().top + window.pageYOffset - offset -8; window.scrollTo({top,behavior:'smooth'}); } } else navigate('/', { state: { scrollTo: 'about' } }); }}>About</a>
              <a onClick={(e) => { e?.preventDefault(); setMobileOpen(false); if (location.pathname === '/') { const id='features'; const el=document.getElementById(id); if(el){ const nav=document.querySelector('.navbar'); const offset = nav?nav.offsetHeight:0; const top=el.getBoundingClientRect().top + window.pageYOffset - offset -8; window.scrollTo({top,behavior:'smooth'}); } } else navigate('/', { state: { scrollTo: 'features' } }); }}>Features</a>
              <a onClick={(e) => { e?.preventDefault(); setMobileOpen(false); if (location.pathname === '/') { const id='how'; const el=document.getElementById(id); if(el){ const nav=document.querySelector('.navbar'); const offset = nav?nav.offsetHeight:0; const top=el.getBoundingClientRect().top + window.pageYOffset - offset -8; window.scrollTo({top,behavior:'smooth'}); } } else navigate('/', { state: { scrollTo: 'how' } }); }}>How It Works</a>
              <button className="mobile-signin" onClick={() => { setMobileOpen(false); navigate('/login'); }}>Sign In</button>
              <button className="mobile-getstarted" onClick={() => { setMobileOpen(false); navigate('/login'); }}>Get Started</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
