import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateAuth } from '../store';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Deposit = ()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [depositFunds, setDepositFunds] = useState('')
  const [tradingFunds, setTradingFunds] = useState('')
  const { auth } = useSelector(state => state);

  
  useEffect(()=> {
    if(auth.id){
        setTradingFunds(auth.tradingFunds ? auth.tradingFunds : '')
    }
  }, [auth]);

//   const deposit = async(ev)=> {
//     ev.preventDefault();
//     setTradingFunds(tradingFunds + depositFunds)
//     dispatch(updateAuth({ tradingFunds }));
//     navigate('/home')
//   };

  const deposit = async(ev)=> {
    ev.preventDefault();
    dispatch(updateAuth({ tradingFunds }));
    navigate('/home')
  };


  return (
    <div>
      <h2 style={{display: 'flex', justifyContent:'center'}}>Deposit Funds</h2>
      <div style={{display: 'flex', justifyContent:'center'}}>
      <form onSubmit={ deposit } >
     
      {/* <TextField  label="Add to Funds For Trading" variant="outlined" value={ depositFunds } onChange={ev => setDepositFunds(ev.target.value)}  style={{width: 300}}/>
      <Button style={{ width: 300 }} onClick={ deposit } disabled={ !depositFunds }>Deposit</Button> */}

       <TextField  label="Deposit Funds For Trading" variant="outlined" value={ tradingFunds } onChange={ev => setTradingFunds(ev.target.value)}  />
      <Button style={{ width: 400 }} onClick={ deposit } disabled={ !tradingFunds }>Deposit</Button>
      

    
        <Link style={{ paddingLeft: 65}} to={`/register`} >Not a Member? Register Here</Link>
      </form>
      </div>
    </div>
  );
};

export default Deposit;