import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import auth from '../../auth';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <h1>Expensify</h1>
      <div>
          <NavLink to="/dashboard" className="">Home</NavLink>
          <NavLink to="/create" className="">Add Expense</NavLink>
          <NavLink to="/help" className="">Help</NavLink>
        </div>
        <button onClick={(e) => {
          auth.userSignOut();
          navigate('/');
        }}>Logout</button>
    </header>
  );
};

export default Header;
