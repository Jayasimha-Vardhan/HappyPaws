import React from 'react';

export default function StatCard({ title, value }) {
  return (
    <div className="hp-statcard">
      <div className="hp-statcard-title">{title}</div>
      <div className="hp-statcard-value">{value}</div>
    </div>
  );
}
