import "./Home.css";
import React from "react";
import { Link } from 'react-router-dom';

const hero = process.env.PUBLIC_URL + '/pets.jpg';
const heroImg = process.env.PUBLIC_URL + '/pets.jpg';

const stats = [
  { value: "2,500+", label: "Happy Pets" },
  { value: "1,200+", label: "Pet Owners" },
  { value: "15+", label: "Expert Vets" },
  { value: "10,000+", label: "Visits Completed" },
];

const features = [
  { title: "Owner Management", desc: "Keep track of pet owners with contact details.", icon: "👥" },
  { title: "Pet Records", desc: "Comprehensive pet profiles with medical history.", icon: "🐾" },
  { title: "Visit Scheduling", desc: "Easy appointment booking and reminders.", icon: "📅" },
  { title: "Vet Directory", desc: "Access to our qualified veterinarian team.", icon: "🩺" },
];

export default function Home() {
  return (
    <div className="hp-home-page">
      {/* Top hero section matching the uploaded design */}
      <section className="top-hero">
        <div className="container top-hero-inner">
          <div className="hero-left">
            <div className="hero-badge">♡ Care for Every Paw</div>
            <h1 className="hero-title">
              Welcome to <span className="accent">Happy</span>
              <br /> <span className="accent-light">Paws</span>
              <br /> Veterinary Clinic
            </h1>
            <p className="hero-desc">Your trusted partner in pet healthcare. Happy Paws provides comprehensive veterinary services with love and expertise for your furry family members.</p>
            <div className="hero-ctas">
              <Link to="/register" className="btn hp-cta primary">Get Started →</Link>
              <Link to="/veterinarians" className="btn hp-cta ghost">Meet Our Vets</Link>
            </div>

            <div className="hero-features">
              <div className="hf-item">🛡️ Licensed & Certified</div>
              <div className="hf-item">⏰ 24/7 Emergency Care</div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-image-card">
              <img src={heroImg} alt="pets" />
              <div className="image-overlay-card">
                <div className="ioc">🐾</div>
                <div className="io-text">
                  <div className="io-value">98%</div>
                  <div className="io-label">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="hp-stats-row">
        {stats.map((s) => (
          <div key={s.label} className="hp-stat">
            <div className="hp-stat-value">{s.value}</div>
            <div className="hp-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="hp-hero">
        <div className="hp-hero-inner container">
          <h2>Comprehensive Pet Care Management</h2>
          <p className="hp-sub">Everything you need to manage your veterinary clinic efficiently and provide the best care for your patients.</p>
        </div>
      </section>

      <section className="hp-features container">
        <div className="hp-cards">
          {features.map((f) => (
            <div key={f.title} className="hp-card">
              <div className="hp-card-icon">{f.icon}</div>
              <h3 className="hp-card-title">{f.title}</h3>
              <p className="hp-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA section */}
      <section className="hp-bottom-cta">
        <div className="container cta-inner">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-desc">Join thousands of pet owners who trust Happypaws for their pet's healthcare needs.</p>
          <a className="btn cta-btn" href="/">Explore Dashboard →</a>
        </div>
      </section>

      <div className="hp-hero-image-abs">
        <img src={hero} alt="happy pets" />
      </div>
    </div>
  );
}
