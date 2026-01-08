import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Vets() {
  const [vets, setVets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', specialty: '' });

  async function load() {
    const res = await api.get('/veterinarians');
    setVets(res.data || []);
  }

  useEffect(() => { load(); }, []);

  function startAdd() { setEditing(null); setForm({ firstName: '', lastName: '', specialty: '' }); }
  function startEdit(v) { setEditing(v.id); setForm({ firstName: v.firstName, lastName: v.lastName, specialty: v.specialty }); }

  async function save(e) {
    e.preventDefault();
    if (editing) await api.put(`/veterinarians/${editing}`, form);
    else await api.post('/veterinarians', form);
    await load(); setEditing(null);
  }

  async function remove(id) { if (!window.confirm('Delete vet?')) return; await api.delete(`/veterinarians/${id}`); await load(); }

  return (
    <div>
      <h3>Veterinarians</h3>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <button className="btn btn-primary mb-2" onClick={startAdd}>Add Vet</button>
          <table className="table table-sm">
            <thead><tr><th>Name</th><th>Specialty</th><th></th></tr></thead>
            <tbody>
              {vets.map(v => (
                <tr key={v.id}><td>{v.firstName} {v.lastName}</td><td>{v.specialty}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => startEdit(v)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => remove(v.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ width: 360 }}>
          <h5>{editing ? 'Edit Vet' : 'New Vet'}</h5>
          <form onSubmit={save}>
            <div className="mb-2"><label className="form-label">First Name</label><input className="form-control" value={form.firstName} onChange={e=>setForm({...form, firstName: e.target.value})} /></div>
            <div className="mb-2"><label className="form-label">Last Name</label><input className="form-control" value={form.lastName} onChange={e=>setForm({...form, lastName: e.target.value})} /></div>
            <div className="mb-2"><label className="form-label">Specialty</label><input className="form-control" value={form.specialty} onChange={e=>setForm({...form, specialty: e.target.value})} /></div>
            <div>
              <button className="btn btn-success me-2" type="submit">Save</button>
              <button type="button" className="btn btn-secondary" onClick={()=>{ setEditing(null); setForm({ firstName: '', lastName: '', specialty: '' }); }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
