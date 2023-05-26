import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import auth from '../../auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className='box-layout__title'>Expensify App</h1>
        <p>It is time to get your expenses under control!</p>
        {
          (auth.isAuthenticatedUser(user)) ? (
            <div>
              <h1>You have signed in: {user.displayName}</h1>
              <button onClick={(e) => {
                navigate('/dashboard');
              }}>Go to dashboard</button>
              <button onClick={(e) => {
                auth.userSignOut();
              }}>Not Me</button>
            </div>
          ) : (
            <button onClick={(e) => {
              auth.userSignIn();
            }}>Login with google</button>
          )
        }
      </div>
    </div>
  );
};

export default LoginPage;
