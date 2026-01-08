import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function OwnerList() {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    async function fetchOwners() {
      const res = await api.get('/owners');
      setOwners(res.data || []);
    }
    fetchOwners();
  }, []);

  return (
    <main className="container mt-4">
      <h2>Owners</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Telephone</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((o) => (
            <tr key={o.id}>
              <td>{o.firstName} {o.lastName}</td>
              <td>{o.city}</td>
              <td>{o.telephone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
