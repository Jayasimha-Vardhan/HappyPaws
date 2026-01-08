import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Pet Owner');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [vetLicense, setVetLicense] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';
  const { register } = useAuth();

  const validate = () => {
    if (!name) return 'Name is required';
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email is invalid';
    if (!password || password.length < 6) return 'Password must be at least 6 characters';
    if (role === 'Vet' && !vetLicense) return 'Vet license is required for vets';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);
    setLoading(true);
    setError('');
    try {
      const meta = {};
      if (role === 'Vet') meta.license = vetLicense.trim();
      if (role === 'Pet Owner') meta.ownerId = ownerId.trim();
      const res = await register(name, email, password, role, meta);
      if (!res.ok) throw new Error(res.error || 'Registration failed');
      navigate(from, { state: { justLoggedIn: true } });
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-dark">
      <div className="back-home">
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
      <div className="auth-card-dark">
        <div className="auth-top-dark">
          <h1>Create account</h1>
          <p className="auth-sub-dark">Sign up to manage your pets and appointments</p>
        </div>

        <div className="role-toggle">
          <button type="button" className={`role-btn ${role === 'Pet Owner' ? 'active' : ''}`} onClick={() => { setRole('Pet Owner'); setError(''); }}>Pet Owner</button>
          <button type="button" className={`role-btn ${role === 'Vet' ? 'active' : ''}`} onClick={() => { setRole('Vet'); setError(''); }}>Vet</button>
        </div>

        <form className="auth-form-dark" onSubmit={handleSubmit}>
          {error && <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div>}
          <label className="field">
            <span className="field-label">Name</span>
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true" />
              <input placeholder="Enter your name" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </label>

          <label className="field">
            <span className="field-label">Email</span>
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true" />
              <input placeholder="Enter your email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true" />
              <input placeholder="Create a password" type={show ? 'text' : 'password'} name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="eye" onClick={() => setShow((s) => !s)}>{show ? 'Hide' : 'Show'}</button>
            </div>
          </label>

          {role === 'Vet' && (
            <label className="field">
              <span className="field-label">Vet License</span>
              <div className="input-wrap">
                <input placeholder="Enter your license (e.g. VET-001)" type="text" name="license" value={vetLicense} onChange={(e) => setVetLicense(e.target.value)} />
              </div>
            </label>
          )}

          {role === 'Pet Owner' && (
            <label className="field">
              <span className="field-label">Owner ID (optional)</span>
              <div className="input-wrap">
                <input placeholder="Enter your owner ID" type="text" name="ownerId" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} />
              </div>
            </label>
          )}

          <div className="form-actions">
            <div />
            <button className="submit" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
          </div>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
