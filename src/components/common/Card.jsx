import React from 'react';

export default function Card({ children, className = '' }) {
  return <div className={`hp-card ${className}`}>{children}</div>;
}
