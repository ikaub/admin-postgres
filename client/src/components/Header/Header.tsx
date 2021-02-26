import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const id = JSON.parse(localStorage.getItem('user') as string).id;

  const logout = () => {
    localStorage.removeItem('user');
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__nav-link" to="/create-profile">Create Profile</Link>
        <Link className="header__nav-link" to={`/users/${id}`}>My Profiles</Link>
        <Link onClick={logout} className="header__nav-link" to="/auth">Log Out</Link>
      </nav>
    </header>
  );
};
