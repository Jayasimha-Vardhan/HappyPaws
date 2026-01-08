import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ username: '', password: '', role: 'USER' });

  async function load() {
    const res = await api.get('/users');
    setUsers(res.data || []);
  }

  useEffect(() => { load(); }, []);

  function startAdd() {
    setEditing(null);
    setForm({ username: '', password: '', role: 'USER' });
  }

  function startEdit(u) {
    setEditing(u.id);
    setForm({ username: u.username || '', password: u.password || '', role: u.role || 'USER' });
  }

  async function save(e) {
    e.preventDefault();
    if (editing) {
      await api.put(`/users/${editing}`, form);
    } else {
      await api.post('/users', form);
    }
    await load();
    setEditing(null);
  }

  async function remove(id) {
    if (!window.confirm('Delete this user?')) return;
    await api.delete(`/users/${id}`);
    await load();
  }

  return (
    <div>
      <h3>Users</h3>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <button className="btn btn-primary mb-2" onClick={startAdd}>Add User</button>
          <table className="table table-sm">
            <thead>
              <tr><th>Username</th><th>Role</th><th></th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => startEdit(u)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => remove(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ width: 360 }}>
          <h5>{editing ? 'Edit User' : 'New User'}</h5>
          <form onSubmit={save}>
            <div className="mb-2">
              <label className="form-label">Username</label>
              <input className="form-control" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <div className="mb-2">
              <label className="form-label">Role</label>
              <select className="form-select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>
            </div>
            <div>
              <button className="btn btn-success me-2" type="submit">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => { setEditing(null); setForm({ username: '', password: '', role: 'USER' }); }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
