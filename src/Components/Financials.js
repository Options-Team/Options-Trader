import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuth } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Financials = ()=> {
  const [approximateAnnualIncome, setApproximateAnnualIncome] = useState('');
  const [approximateTotalNetWorth, setApproximateTotalNetWorth] = useState('')
  const [approximateLiquidNetWorth, setApproximateLiquidNetWorth] = useState('')
  const [sourceOfIncome, setSourceOfIncome] = useState('')
  const [accountFundingMethod, setAccountFundingMethod] = useState('')
  const [tradingYearsOfExperience, setTradingYearsOfExperience] = useState('')

  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
    if(auth.id){
        setApproximateAnnualIncome(auth.approximateAnnualIncome ? auth.approximateAnnualIncome : '')
        setApproximateTotalNetWorth(auth.approximateTotalNetWorth ? auth.approximateTotalNetWorth : '')
        setApproximateLiquidNetWorth(auth.approximateLiquidNetWorth ? auth.approximateLiquidNetWorth : '')
        setSourceOfIncome(auth.sourceOfIncome ? auth.sourceOfIncome : '')
        setAccountFundingMethod(auth.accountFundingMethod ? auth.accountFundingMethod : '')
        setTradingYearsOfExperience(auth.tradingYearsOfExperience ? auth.tradingYearsOfExperience : '')
     
    }
  }, [auth]);

  const _update = async(ev)=> {
    ev.preventDefault();
    dispatch(updateAuth({ approximateAnnualIncome, approximateTotalNetWorth, approximateLiquidNetWorth, sourceOfIncome, accountFundingMethod, tradingYearsOfExperience}));
    navigate('/financials')
  };

  const _submit = async(ev)=> {
    ev.preventDefault();
    dispatch(updateAuth({ approximateAnnualIncome, approximateTotalNetWorth, approximateLiquidNetWorth, sourceOfIncome, accountFundingMethod, tradingYearsOfExperience }));
    navigate('/summary')
  };
  return (
    <div>
      {
        auth.id ? (
            <div>
                <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> Financials & Trading Experience </h1>
                <h5 >Financials</h5>
                <hr />
                <h6 >We are required to collect certain financial information for tax purposes</h6>
                <div>
                    
                    <form onSubmit={ _update }>
                    <div style={{display: 'flex', justifyContent:'start', flexDirection:'column' }}>
                        <Box sx={{ minWidth: 400 }}>
                        <FormControl sx={{ minWidth: 400 }}>
                            <InputLabel id="demo-simple-select-label">Approximate Annual Income</InputLabel>
                            <Select
                            value={approximateAnnualIncome}
                            label="Approximate Annual Income"
                            onChange={(ev) => setApproximateAnnualIncome(ev.target.value)}
                            >
                            <MenuItem value={'25,000'}>$25,000</MenuItem>
                            <MenuItem value={'50,000'}>$50,000</MenuItem>
                            <MenuItem value={'75,000'}>$75,000</MenuItem>
                            <MenuItem value={'100,000'}>$100,000</MenuItem>
                            <MenuItem value={'150,000'}>$150,000</MenuItem>
                            <MenuItem value={'200,000'}>$200,000</MenuItem>
                            <MenuItem value={'300,000'}>$300,000</MenuItem>
                           
                            </Select>
                        </FormControl>
                        </Box>
                        <div style={{ marginBottom: 8 }}/>
                        <Box sx={{ minWidth: 400 }}>
                        <FormControl  sx={{ minWidth: 400 }}>
                            <InputLabel id="demo-simple-select-label">Approximate Total Net Worth</InputLabel>
                            <Select
                            value={approximateTotalNetWorth}
                            label="Approximate Total Net Worth"
                            onChange={(ev) => setApproximateTotalNetWorth(ev.target.value)}
                            >
                            <MenuItem value={'50,000'}>$50,000</MenuItem>
                            <MenuItem value={'100,000'}>$100,000</MenuItem>
                            <MenuItem value={'150,000'}>$150,000</MenuItem>
                            <MenuItem value={'200,000'}>$200,000</MenuItem>
                            <MenuItem value={'300,000'}>$300,000</MenuItem>
                            <MenuItem value={'400,000'}>$400,000</MenuItem>
                            <MenuItem value={'600,000'}>$600,000</MenuItem>
                            <MenuItem value={'1,000,000'}>$1,000,000</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                        <div style={{ marginBottom: 8 }}/>
                        <Box sx={{ minWidth: 400 }}>
                        <FormControl sx={{ minWidth: 400 }} >
                            <InputLabel id="demo-simple-select-label">Approximate Liquid Net Worth</InputLabel>
                            <Select
                            value={approximateLiquidNetWorth}
                            label="Approximate Liquid Net Worth"
                            onChange={(ev) => setApproximateLiquidNetWorth(ev.target.value)}
                            >
                            <MenuItem value={'50,000'}>$50,000</MenuItem>
                            <MenuItem value={'75,000'}>$75,000</MenuItem>
                            <MenuItem value={'100,000'}>$100,000</MenuItem>
                            <MenuItem value={'120,000'}>$120,000</MenuItem>
                            <MenuItem value={'150,000'}>$150,000</MenuItem>
                            <MenuItem value={'200,000'}>$200,000</MenuItem>
                            <MenuItem value={'300,000'}>$300,000</MenuItem>
                            <MenuItem value={'400,000'}>$400,000</MenuItem>
                            <MenuItem value={'600,000'}>$600,000</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                        <div style={{ marginBottom: 8 }}/>
                        <Box sx={{ minWidth: 400 }}>
                        <FormControl sx={{ minWidth: 400 }}>
                            <InputLabel id="demo-simple-select-label">What is your Source of Income</InputLabel>
                            <Select
                            value={sourceOfIncome}
                            label="Source of Income"
                            onChange={(ev) => setSourceOfIncome(ev.target.value)}
                            >
                            <MenuItem value={'Employment'}>Employment</MenuItem>
                            <MenuItem value={'Inheritence'}>Inheritence</MenuItem>
                            <MenuItem value={'Investments'}>Investments</MenuItem>
                            <MenuItem value={'Crypto'}>Crypto</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                        <div style={{ marginBottom: 8 }}/>
                        <Box sx={{ minWidth: 400 }}>
                        <FormControl sx={{ minWidth: 400 }}>
                            <InputLabel id="demo-simple-select-label">How Will You Fund Your Account?</InputLabel>
                            <Select
                            value={accountFundingMethod}
                            label="Account Funding Method"
                            onChange={(ev) => setAccountFundingMethod(ev.target.value)}
                            >
                            <MenuItem value={'Checking'}>Checking</MenuItem>
                            <MenuItem value={'Savings'}>Savings</MenuItem>
                            <MenuItem value={'Crypto'}>Crypto</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                        <div style={{ marginBottom: 8 }}/>
                      </div>
                    <div style={{ marginBottom: 8 }}/>
                   
                    <h5 >Trading Experience</h5>
                    <hr />
                    <div style={{ marginBottom: 8 }}/>
                    <div sx={{ minWidth: 100 }}>
                    <TextField label="Years of Experience" variant="outlined" value={ tradingYearsOfExperience } onChange={ev => setTradingYearsOfExperience(ev.target.value)} />
                   </div>
                            
                    <Button onClick={ _update } >Save Profile</Button><Button onClick={ _submit } >Submit & Proceed</Button>
                    </form>
                </div>
            </div>
        
        )  : (
            <div>
                <h1>Can't Update If You're Not Logged In!</h1>
                <div>
                    <Link to={`/register`}>Register Here</Link> or <Link to='/login'> Login </Link>
                </div>
            </div>
          )
        } 
     
    </div>
  );
};

export default Financials;

