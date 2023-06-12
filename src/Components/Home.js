import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToDeposit = ()=> {
    navigate('/deposit')
  };

  return (
    <div>
      <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Home</h1>
        {/* { auth.id ? <div> Welcome { auth.username }!! */}
        {/* <button onClick={()=> dispatch(logout())}>Logout</button> */}
      {/* </div> : <Link to='/login' style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Login</Link>} */}
      <div  >
        <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Need A Place To Start?</h1>
        <Link to={`/riskAssessment/${auth.id}`} style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Click Here to Complete Risk Assessment</Link>
        <Button component='div' style={{display: 'flex', justifyContent:'center', alignItems:'center'}} onClick={ goToDeposit } >Deposit</Button>
      </div>
      {auth.tradingFunds === 0 || null ? <Button onClick={ goToDeposit } >Deposit</Button> : null }
      
    </div>
  );
};

export default Home;
