import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import auth from '../../auth';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.userAuth(
      () => { navigate('/dashboard'); }, 
      () => { navigate('/'); }
    );
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={(e) => {
        const user = auth.getUser();
        if(user) {
          navigate('/dashboard');
          return;
        }
        auth.userSignIn();
      }}>Login with google</button>
    </div>
  );
};

export default LoginPage;
