import React, { useState, useEffect } from 'react';
import './AuditLogs.css';
import api from '../../services/api';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await api.get('/audit-logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Failed to fetch audit logs', error);
      }
    }

    fetchLogs();
  }, []);

  return (
    <div className="audit-logs">
      <h2>Audit Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Action</th>
            <th>Performed By</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.timestamp}</td>
              <td>{log.action}</td>
              <td>{log.performedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}