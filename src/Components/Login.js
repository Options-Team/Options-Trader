import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const Login = ()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const onChange = ev => {
    setCredentials({...credentials, [ ev.target.name ]: ev.target.value });
  };

  const login = (ev)=> {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate('/home')
  };
  return (
    <div>
      <h2 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Login</h2>
      <form onSubmit={ login }>
      <TextField label="Username" name = 'username' variant="outlined" value={ credentials.username } onChange={onChange} />
      <div style={{ marginBottom: 8 }}/>
      <TextField label="Password" name = 'password' variant="outlined" value={ credentials.password } onChange={onChange} />
      <GoogleOAuthProvider clientId = "18136828756-l5ol7p0u1f928hapfa4fr3pubvclahje.apps.googleusercontent.com">

      <GoogleLogin
        onSuccess={credentialResponse => {
        const decoded = jwt_decode(credentialResponse.credential);
        console.log(credentialResponse);
        console.log(decoded);
      }}
        onError={() => {
        console.log('Login Failed');
      }}
      />;
      </GoogleOAuthProvider>
      <Button onClick={ login } disabled={ !credentials }>Login</Button>
    
        <Link to={`/register`}>Not a Member? Register Here</Link>
      </form>
    </div>
  );
};

export default Login;
