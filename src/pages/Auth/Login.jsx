import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Pet Owner');
  const [vetLicense, setVetLicense] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';
  const { login } = useAuth();

  const validate = () => {
    if (!username) return 'Username is required';
    if (!password) return 'Password is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);
    try {
      const extras = {};
      if (selectedRole === 'Vet') extras.license = vetLicense.trim();
      if (selectedRole === 'Pet Owner') extras.ownerId = ownerId.trim();

      const res = await login(username, password, extras);
      if (!res.ok) throw new Error(res.error || 'Login failed');
      const userRole = (res.data.user.role || '').toString().toLowerCase();
      if (userRole !== selectedRole.toLowerCase()) {
        // role mismatch — ask user to switch role button
        setError(`Role mismatch: this account is registered as ${res.data.user.role}. Please select the correct role button.`);
        return;
      }
      navigate(from, { state: { justLoggedIn: true } });
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page-dark">
      <div className="back-home">
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
      <div className="auth-card-dark">
        <div className="auth-top-dark">
          <div className="auth-logo-dark">HP</div>
          <h1>Welcome Back</h1>
          <p className="auth-sub-dark">Sign in to access your HappyPaws dashboard</p>
        </div>

        <div className="role-toggle">
          <button type="button" className={`role-btn ${selectedRole === 'Pet Owner' ? 'active' : ''}`} onClick={() => { setSelectedRole('Pet Owner'); setError(''); }}>Pet Owner</button>
          <button type="button" className={`role-btn ${selectedRole === 'Vet' ? 'active' : ''}`} onClick={() => { setSelectedRole('Vet'); setError(''); }}>Vet</button>
        </div>

        <form className="auth-form-dark" onSubmit={handleSubmit}>
          {error && <div style={{ color: '#ff6b6b', marginBottom: 8 }}>{error}</div>}
          <label className="field">
            <span className="field-label">Username</span>
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true" />
              <input placeholder="Enter your username (name or email)" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true" />
              <input placeholder="Enter your password" type={show ? 'text' : 'password'} name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="eye" onClick={() => setShow((s) => !s)}>{show ? 'Hide' : 'Show'}</button>
            </div>
          </label>

          {selectedRole === 'Vet' && (
            <label className="field">
              <span className="field-label">Vet License</span>
              <div className="input-wrap">
                <input placeholder="Enter your license (e.g. VET-001)" type="text" name="license" value={vetLicense} onChange={(e) => setVetLicense(e.target.value)} />
              </div>
            </label>
          )}

          {selectedRole === 'Pet Owner' && (
            <label className="field">
              <span className="field-label">Owner ID (optional)</span>
              <div className="input-wrap">
                <input placeholder="Enter your owner ID" type="text" name="ownerId" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} />
              </div>
            </label>
          )}

          <div className="form-actions">
            <a className="forgot" href="#">Forgot password?</a>
            <button className="submit" type="submit">Sign In</button>
          </div>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
