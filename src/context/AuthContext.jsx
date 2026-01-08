import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      // Try a real API call first; if it fails, fall back to a mocked response.
      let data;
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        if (res.ok) data = await res.json();
        else throw new Error('Network response not ok');
      } catch (e) {
        // Try local auth service fallback (uses localStorage mock users)
        await new Promise((r) => setTimeout(r, 250));
        try {
          const u = authService.login(username, password);
          data = { token: 'demo-token-12345', user: u };
        } catch (err) {
          // Last resort: mocked response
          data = {
            token: 'demo-token-12345',
            user: { name: username || 'Demo User', role: (username === 'admin' ? 'Admin' : 'Customer'), email: `${username || 'demo'}@example.com` },
          };
        }
      }

      setToken(data.token);
      setUser(data.user);
      setLoading(false);
      return { ok: true, data };
    } catch (err) {
      setLoading(false);
      return { ok: false, error: err };
    }
  };

  const register = async (name, email, password, role = 'Pet Owner', meta = {}) => {
    setLoading(true);
    try {
      // Try server registration first (if API exists)
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role, meta }),
        });
        if (res.ok) {
          const data = await res.json();
          setToken(data.token);
          setUser(data.user);
          setLoading(false);
          return { ok: true, data };
        }
      } catch (e) {
        // fallback to local auth service
        const newUser = authService.register(name, email, password, role, meta);
        const data = { token: 'demo-token-registered', user: newUser };
        setToken(data.token);
        setUser(data.user);
        setLoading(false);
        return { ok: true, data };
      }

      setLoading(false);
      return { ok: false, error: 'Registration failed' };
    } catch (err) {
      setLoading(false);
      return { ok: false, error: err };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    loading,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
