import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import auth from '../../auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>Login Page</h1>
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
  );
};

export default LoginPage;
