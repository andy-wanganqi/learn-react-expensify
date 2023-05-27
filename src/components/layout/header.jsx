import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import auth from '../../auth';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className='header'>
      <div className='content-container'>
        <div className='header__content'>
          <Link to="/dashboard" className="header__title">
            <h1>Expensify</h1>
          </Link>
          <button onClick={(e) => {
            auth.userSignOut();
            navigate('/');
          }}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
