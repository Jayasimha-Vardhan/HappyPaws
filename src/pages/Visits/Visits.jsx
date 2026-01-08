import React, { useState } from 'react';
import './Visits.css';
import ScheduleVisitModal from '../../components/visits/ScheduleVisitModal';

export default function Visits() {
  const [show, setShow] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Visits');

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <main className="visits-page container">
      <header className="visits-header">
        <div className="visits-left">
          <div className="visits-icon">📅</div>
          <div className="visits-titles">
            <h1>Visit Records</h1>
            <p className="visits-sub">Track and manage all pet visits and appointments</p>

            <div className="visit-filters">
              {['All Visits', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'].map((filter) => (
                <button
                  key={filter}
                  className={`filter ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="visits-right">
          <button className="schedule-btn btn btn-success" onClick={() => setShow(true)}>+ Schedule Visit</button>
        </div>
      </header>

      <section className="visits-empty">
        <div className="empty-icon">📅</div>
        <p>No visits found. Schedule your first visit to get started.</p>
      </section>

      {show && <ScheduleVisitModal onClose={() => setShow(false)} onSaved={() => { /* can refresh list */ }} />}
    </main>
  );
}
