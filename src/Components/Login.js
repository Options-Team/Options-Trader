import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      <h2 style={{display: 'flex', justifyContent:'center'}}>Login</h2>
      <div style={{display: 'flex', justifyContent:'center'}}>
      <form onSubmit={ login } >
      <TextField label="Username" name = 'username' variant="outlined" value={ credentials.username } onChange={onChange} style={{display: 'flex', justifyContent:'center', width: 300 }}/>
      <div style={{ marginBottom: 8 }}/>
      <TextField label="Password" name = 'password' variant="outlined" value={ credentials.password } onChange={onChange} style={{display: 'flex', justifyContent:'center', width: 300 }}/>

      <Button style={{ width: 300 }} onClick={ login } disabled={ !credentials }>Login</Button>
    
        <Link style={{ paddingLeft: 15}}to={`/register`} >Not a Member? Register Here</Link>
      </form>
      </div>
    </div>
  );
};

export default Login;
