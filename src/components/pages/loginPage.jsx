import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import LoadingPage from './LoadingPage.jsx';
import auth from '../../auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  if (user.__authentication === undefined) {
    return (
      <LoadingPage />
    )
  }

  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1>Expensify</h1>
        <h2>It is time to get your expenses under control!</h2>
        {
          (auth.isAuthenticatedUser(user)) ? (
            <div>
              <p>You have signed in with google account: {user.displayName}</p>
              <div className='button-group box-layout__buttons'>
                <div className='button-group__item'>
                <button className='button button-lg' onClick={(e) => {
                  navigate('/dashboard');
                }}>Go to dashboard</button>
                </div>
                <div className='button-group__item'>
                <button className='button button-lg' onClick={(e) => {
                  auth.userSignOut();
                }}>Not Me</button>
                </div>
              </div>
            </div>
          ) : (
            <div className='button-group box-layout__buttons'>
                <div className='button-group__item'>
              <button className='button button-lg' onClick={(e) => {
                auth.userSignIn();
              }}>Login with google</button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
};

export default LoginPage;
