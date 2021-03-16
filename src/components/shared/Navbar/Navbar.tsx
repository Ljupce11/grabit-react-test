import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-light bg-secondary">
      <Link to="/">
        <span className="navbar-brand text-white">Secure Cloud Storage</span>
      </Link>
    </nav>
  )
}