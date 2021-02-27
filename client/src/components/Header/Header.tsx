import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export const Header: React.FC = () => {
  if (!localStorage.getItem('user')) return <Redirect to="/auth"/>;

  const { id, role } = JSON.parse(localStorage.getItem('user') as string);

  const logout = () => {
    localStorage.removeItem('user');
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__nav-link" to="/create-profile">Create Profile</Link>
        <Link className="header__nav-link" to={`/users/${id}`}>My Profiles</Link>
        {role === 'ADMIN' ? <Link className="header__nav-link" to="/admin">Admin</Link> : null}
        <Link onClick={logout} className="header__nav-link" to="/auth">Log Out</Link>
      </nav>
    </header>
  );
};
