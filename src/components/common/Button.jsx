import React from 'react';

export default function Button({ children, onClick, className = '' }) {
  return (
    <button className={`hp-btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
