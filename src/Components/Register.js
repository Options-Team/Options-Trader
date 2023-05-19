
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  register } from '../store';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Register = ()=> {
  const [username, setUsername ] = useState('');
  const [password, setPassword ] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _register = async(ev)=> {
    ev.preventDefault();
    const credentials = {
      username,
      password
    };

    try {
      dispatch(register(credentials));
      navigate('/home');
    }
    catch(ex){
      console.log(ex)
    }
  };
  return (

    <form onSubmit={ _register }>
        <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Registration</h1>
            <div style={{ marginBottom: 16 }}/>
        <TextField label="Username" name = 'username' variant="outlined" value={ username } onChange={ev => setUsername(ev.target.value)} />
            <div style={{ marginBottom: 4 }}/>
        <TextField label="Password" name = 'password' variant="outlined" value={ password } onChange={ev => setPassword(ev.target.value)} />

        <Button onClick={ _register } disabled={ !username || !password}>Register</Button>
    </form>
  );
};

export default Register;