import React from 'react';

export default function Badge({ children, className = '' }) {
  return <span className={`hp-badge ${className}`}>{children}</span>;
}
