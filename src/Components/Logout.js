import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'



const Logout = ()=> {
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const _logout = (user) => {
        dispatch(logout(user))
        navigate('/')
    }

  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
        {
        auth.id ? (
            <div>
                <h1 style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>Logout</h1>
                <div>
                    Are you sure you want to log out?
                    
                </div>
                <Button style={{display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 20, backgroundColor: 'green'}} component="div" variant="contained" onClick={(user)=> (_logout(user))}>Logout</Button>
            </div>
        
        )  : (

            <div >
                <h2 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>You're Not Logged In!</h2>
                
                <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <Button sx={{width: 100}} onClick={()=> navigate('/register')}>Register</Button>
                
                <Button sx={{width: 100}} onClick={()=> navigate('/login')}>Login</Button>
                    {/* <Link to={`/register`}>Register Here</Link> or <Link to='/login'> Login </Link> */}
                </div>
            </div>
           
        )
        } 
    
    </div>
  );
};

export default Logout;