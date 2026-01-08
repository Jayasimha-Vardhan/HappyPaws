import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="hp-footer">
      <div className="hp-footer-inner container">
        <div className="footer-brand">
          <div className="brand-logo">HappyPaws</div>
          <p className="brand-desc">Pet healthcare management for clinics — appointments, owners, pet records and more.</p>
        </div>

        <div className="footer-links">
          <div className="links-col">
            <h4>Product</h4>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/register">Get Started</Link>
          </div>
          <div className="links-col">
            <h4>Resources</h4>
            <Link to="/veterinarians">Veterinarians</Link>
            <Link to="/visits">Visits</Link>
            <Link to="/owners">Owners</Link>
          </div>
          <div className="links-col">
            <h4>Company</h4>
            <a href="mailto:hello@happypaws.example">Contact</a>
            <Link to="/admin">Admin</Link>
            <Link to="/auth/login">Sign In</Link>
          </div>
        </div>

        <div className="footer-contact">
          <div>Questions? Email us at <a href="mailto:hello@happypaws.example">hello@happypaws.example</a></div>
          <div className="footer-copy">© {new Date().getFullYear()} HappyPaws — Built for small clinics.</div>
        </div>
      </div>
    </footer>
  );
}
