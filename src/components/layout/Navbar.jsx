import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setShowDropdown(false);
    navigate('/');
  };

  const goProtected = (e, path) => {
    e.preventDefault();
    if (!user) {
      navigate('/register', { state: { from: path } });
      return;
    }
    navigate(path);
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <img src={process.env.PUBLIC_URL + '/HappyPaws Logo.png'} alt="HappyPaws" className="logo-img" />
        </Link>
      </div>

      <nav className="navbar-center">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <a href="/admin/dashboard" onClick={(e) => {
              e.preventDefault();
              // only admins can access admin area
              if ((user.role || '').toLowerCase().includes('admin')) navigate('/admin');
              else navigate('/dashboard', { state: { message: 'Admin access requires admin role' } });
            }}>Admin</a>
            <Link to="/visits">Visits</Link>
          </>
        ) : (
          <>
            <Link to="/">Dashboard</Link>
            <a href="/admin/dashboard" onClick={(e) => { e.preventDefault(); navigate('/login', { state: { from: '/admin' } }); }}>Admin</a>
            <a href="/owners" onClick={(e) => goProtected(e, '/owners')}>Owners</a>
            <a href="/pets" onClick={(e) => goProtected(e, '/pets')}>Pets</a>
            <a href="/visits" onClick={(e) => goProtected(e, '/visits')}>Visits</a>
            <a href="/veterinarians" onClick={(e) => goProtected(e, '/veterinarians')}>Veterinarians</a>
          </>
        )}
      </nav>

      <div className="navbar-right">
        {user ? (
          <div className="user-menu">
            <button className="user-btn" onClick={() => setShowDropdown((s) => !s)}>
              <span>👤</span>
              <span>{user.name}</span>
              <span className="role-badge">{user.role || 'Customer'}</span>
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <div className="dropdown-name">{user.email}</div>
                  <div className="dropdown-role">🛡️ Role: {user.role || 'Customer'}</div>
                </div>
                <button className="dropdown-signout" onClick={handleSignOut}>
                  📤 Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button type="button" className="sign-in" onClick={() => navigate('/login')}>Sign In</button>
            <button type="button" className="get-started" onClick={() => navigate('/register')}>Get Started</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
