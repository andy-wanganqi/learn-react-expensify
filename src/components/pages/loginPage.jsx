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
        <h1 className='box-layout__title'>Expensify</h1>
        <p>It is time to get your expenses under control!</p>
        {
          (auth.isAuthenticatedUser(user)) ? (
            <div>
              <p>You have signed in with google account: {user.displayName}</p>
              <div className='button_group'>
                <button className='button button-lg' onClick={(e) => {
                  navigate('/dashboard');
                }}>Go to dashboard</button>
                <button className='button button-lg' onClick={(e) => {
                  auth.userSignOut();
                }}>Not Me</button>
              </div>
            </div>
          ) : (
            <div className='button_group'>
              <button className='button button-lg' onClick={(e) => {
                auth.userSignIn();
              }}>Login with google</button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default LoginPage;
