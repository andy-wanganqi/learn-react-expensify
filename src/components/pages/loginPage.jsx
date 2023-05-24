import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../store/slices/userSlice';
import auth from '../../auth';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    auth.userAuth(
      (user) => { 
        const payload = user;
        dispatch(setUser(payload));
      }, 
      () => { 
        dispatch(clearUser());
        navigate('/'); 
      }
    );
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      {
        (auth.isAuthUser(user)) ? (
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
            if(auth.isAuthUser(user)) {
              console.log('auth user');
              navigate('/dashboard');
              return;
            }
            auth.userSignIn();
          }}>Login with google</button>
        )
      }
    </div>
  );
};

export default LoginPage;
