import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './ScheduleVisitModal.css';

export default function ScheduleVisitModal({ onClose, onSaved }) {
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);
  const [form, setForm] = useState({ petId: '', vetId: '', date: '', time: '', reason: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [pRes, vRes] = await Promise.all([api.get('/pets'), api.get('/veterinarians')]);
        setPets(pRes.data || []);
        setVets(vRes.data || []);
      } catch (e) {
        // ignore for now
      }
    }
    load();
  }, []);

  const handleChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.petId || !form.date || !form.time) {
      setError('Please select pet, date and time');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        petId: Number(form.petId),
        veterinarianId: form.vetId ? Number(form.vetId) : null,
        date: form.date,
        time: form.time,
        description: form.reason || '' ,
        notes: form.notes || ''
      };
      await api.post('/visits', payload);
      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      setError('Failed to schedule visit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sv-backdrop">
      <div className="sv-modal">
        <div className="sv-header">
          <h5 className="sv-title">Schedule New Visit</h5>
          <button className="sv-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form className="sv-form" onSubmit={handleSubmit}>
          {error && <div className="sv-error">{error}</div>}

          <div className="sv-row">
            <label className="sv-label">Pet</label>
            <select className="sv-select" value={form.petId} onChange={handleChange('petId')}>
              <option value="">Select pet</option>
              {pets.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div className="sv-row">
            <label className="sv-label">Veterinarian (Optional)</label>
            <select className="sv-select" value={form.vetId} onChange={handleChange('vetId')}>
              <option value="">Select veterinarian</option>
              {vets.map(v => <option key={v.id} value={v.id}>{v.firstName} {v.lastName}</option>)}
            </select>
          </div>

          <div className="sv-row sv-row-split">
            <div>
              <label className="sv-label">Date</label>
              <input className="sv-input" type="date" value={form.date} onChange={handleChange('date')} />
            </div>
            <div>
              <label className="sv-label">Time</label>
              <input className="sv-input" type="time" value={form.time} onChange={handleChange('time')} />
            </div>
          </div>

          <div className="sv-row">
            <label className="sv-label">Reason for Visit</label>
            <input className="sv-select" value={form.reason} onChange={handleChange('reason')} placeholder="Select reason" />
          </div>

          <div className="sv-row">
            <label className="sv-label">Notes</label>
            <textarea className="sv-textarea" rows={4} value={form.notes} onChange={handleChange('notes')} placeholder="Any additional notes..." />
          </div>

          <div className="sv-actions">
            <button type="button" className="sv-btn sv-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="sv-btn sv-primary" disabled={loading}>{loading ? 'Scheduling...' : 'Schedule Visit'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Removed unused inline style objects (was causing eslint no-unused-vars warnings) */
