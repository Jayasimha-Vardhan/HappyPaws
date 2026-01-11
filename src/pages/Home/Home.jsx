import "./Home.css";
import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
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

const testimonials = [
  { name: 'Anna Lopez', role: 'Pet Owner', quote: 'Happy Paws made booking vet visits effortless — the staff truly care about my dog.', img: '/jaya.jpg' },
  { name: 'Marcus Reed', role: 'Clinic Manager', quote: 'Our clinic workflow improved dramatically after adopting the Happy Paws system.', img: '/uday.jpg' },
  { name: 'Priya Singh', role: 'Pet Owner', quote: 'Medical records are now at my fingertips. The reminders saved my cat’s life!', img: '/girl.jpg' },
  { name: 'Liam Walker', role: 'Pet Owner', quote: 'The team at Happy Paws went above and beyond during our emergency visit.', img: '/men2.jpg' },
  { name: 'Sofia Martinez', role: 'Veterinarian', quote: 'Happy Paws helps clinics deliver faster, more informed care with an intuitive interface.', img: '/girl2.jpg' },
];

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const id = location.state && location.state.scrollTo;
    if (!id) return;
    // small delay to allow navigation/mount to finish
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const nav = document.querySelector('.navbar');
        const offset = nav ? nav.offsetHeight : 0;
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      // remove navigation state so repeated clicks still work
      try { window.history.replaceState({}, document.title, window.location.pathname + window.location.search); } catch (e) {}
    }, 80);
    return () => clearTimeout(t);
  }, [location]);
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
              <Link to="/login" className="btn hp-cta primary">Get Started →</Link>
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

      <section className="hp-hero" id="home">
        <div className="hp-hero-inner container">
          <h2>Comprehensive Pet Care Management</h2>
          <p className="hp-sub">Everything you need to manage your veterinary clinic efficiently and provide the best care for your patients.</p>
        </div>
      </section>

      <section className="hp-features container" id="features">
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

      {/* About section */}
      <section className="hp-about container" id="about">
        <div className="about-left">
          <h2 className="about-title">About Happy Paws</h2>
          <p className="about-desc">Happy Paws is a modern veterinary clinic management platform built to make pet care simple, safe, and compassionate. We bring together clinic operations, pet medical records, appointment scheduling, and an experienced network of veterinarians — all in one beautiful, secure interface.</p>

          <ul className="about-list">
            <li><strong>Comprehensive Records:</strong> Centralized pet profiles and medical history for faster, informed care.</li>
            <li><strong>Easy Scheduling:</strong> Intuitive appointment workflows and reminders for owners and staff.</li>
            <li><strong>Trusted Vets:</strong> A vetted team of professionals focused on your pet’s wellbeing.</li>
          </ul>

          <p className="about-note">Designed with clinics and pet owners in mind, Happy Paws helps teams focus on what matters most — healthy, happy animals.</p>
        </div>

        <div className="about-right">
          <div className="about-image-card">
            <img src={process.env.PUBLIC_URL + '/doctor.jpg'} alt="about happy paws" />
          </div>
        </div>
      </section>

      {/* How It Works section */}
      <section className="hp-how container" id="how">
        <div className="how-inner">
          <h2 className="how-title">How It Works</h2>
          <p className="how-sub">A quick, human-friendly overview of how Happy Paws keeps your clinic running smoothly.</p>

          <div className="how-steps">
            <div className="how-step">
              <div className="hs-icon">🔐</div>
              <h3>1. Login</h3>
              <p>Users sign in using secure credentials. The system recognizes your account and role.</p>
            </div>

            <div className="how-step">
              <div className="hs-icon">🛡️</div>
              <h3>2. Role-based access</h3>
              <p>Depending on your role (owner, vet, or admin), you see only the tools and data that matter to you.</p>
            </div>

            <div className="how-step">
              <div className="hs-icon">🔗</div>
              <h3>3. Secure APIs</h3>
              <p>All data exchanges use secure, controlled APIs so information stays private and reliable.</p>
            </div>
          </div>

          <p className="how-note">In short: log in, get the right access, and trust that data is handled securely — no technical jargon required.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="hp-testimonials container">
        <h2 className="testi-heading">What people are saying</h2>
        <p className="testi-sub">Real feedback from pet owners and clinic teams using Happy Paws.</p>

        <div className="testi-cards">
          {testimonials.map((t) => (
            <div key={t.name} className="testi-card">
              <div className="testi-avatar">
                <img src={process.env.PUBLIC_URL + t.img} alt={t.name} />
              </div>
              <div className="testi-body">
                <p className="testi-quote">“{t.quote}”</p>
                <div className="testi-meta">
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
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
