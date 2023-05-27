import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import auth from '../../auth';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  return (
    <header className='header'>
      <div className='content-container'>
        <div className='header__content'>
          <Link to="/dashboard" className="header__title">
            <h1>Expensify</h1>
          </Link>
          <div className='header__actions'>
            <p>Hello, {user.displayName}</p>
            <button className='header--button button-lg' onClick={(e) => {
              auth.userSignOut();
              navigate('/');
            }}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
