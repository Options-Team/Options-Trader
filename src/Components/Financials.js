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
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

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
    navigate('/finalize')
  };
  
  return (
    <div>
      {
        auth.id ? (
            <div>
                <div className="progress">
                <div className="circle done">
                  <span className="label">1</span>
                  <span className="title">Personal</span>
                </div>
                <span className="bar done"></span>
                <div className="circle done">
                  <span className="label">2</span>
                  <span className="title">Work</span>
                </div>
                <span className="bar done"></span>
                <div className="circle active">
                  <span className="label">3</span>
                  <span className="title">Financial</span>
                </div>
                <span className="bar"></span>
                <div className="circle">
                  <span className="label">4</span>
                  <span className="title">Finalize</span>
                </div>
              </div>

              <div style={{}}>
                <form onSubmit={ _update }>
                <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Financials & Trading Experience</h1>
                <Typography sx={{display: 'flex', justifyContent: 'center'}} variant="h6" component="div">We are required to collect certain financial information for tax purposes</Typography>
                  <div>
                    <Card sx={{padding: 2, display: 'flex', flexDirection: 'column'}}>
                      <div style={{display: 'flex', flex: 1, justifyContent: 'space-around', flexDirection: 'row'}}>
                        <div style={{flex: 1, margin: 1}}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', paddingBottom: '8px'}} variant="h7" component="div">Financials</Typography>
                          <FormControl sx={{width: '100%', padding: .5}}>
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
                              <MenuItem value={'300,000'}>$300,000+</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl sx={{width: '100%', padding: .5}}>
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
                              <MenuItem value={'1,000,000'}>$1,000,000+</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl sx={{width: '100%', padding: .5}}>
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
                              <MenuItem value={'600,000'}>$600,000+</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl sx={{width: '100%', padding: .5}}>
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
                          <FormControl sx={{width: '100%', padding: .5}}>
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
                        </div>
                      </div>

                      <div style={{flex: 1, margin: 10}}>
                        <Typography sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', paddingBottom: '8px'}} variant="h7" component="div">Trading Experience</Typography>
                        <div style={{textAlign: 'center'}}>
                          <FormControl sx={{width: '100%', padding: .5}}>
                            <InputLabel id="demo-simple-select-label">Years of Experience</InputLabel>
                            <Select
                              value={tradingYearsOfExperience}
                              label="Years of Experience"
                              onChange={(ev) => setTradingYearsOfExperience(ev.target.value)}
                            >
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                              <MenuItem value={6}>6</MenuItem>
                              <MenuItem value={7}>7</MenuItem>
                              <MenuItem value={8}>8</MenuItem>
                              <MenuItem value={9}>9</MenuItem>
                              <MenuItem value={10}>10</MenuItem>
                              <MenuItem value={11}>11</MenuItem>
                              <MenuItem value={12}>12</MenuItem>
                              <MenuItem value={13}>13</MenuItem>
                              <MenuItem value={14}>14</MenuItem>
                              <MenuItem value={15}>15</MenuItem>
                              <MenuItem value={16}>16</MenuItem>
                              <MenuItem value={17}>17</MenuItem>
                              <MenuItem value={18}>18</MenuItem>
                              <MenuItem value={19}>19</MenuItem>
                              <MenuItem value={20}>20</MenuItem>
                              <MenuItem value={21}>21</MenuItem>
                              <MenuItem value={22}>22</MenuItem>
                              <MenuItem value={23}>23</MenuItem>
                              <MenuItem value={24}>24</MenuItem>
                              <MenuItem value={25}>25</MenuItem>
                              <MenuItem value={26}>26</MenuItem>
                              <MenuItem value={27}>27</MenuItem>
                              <MenuItem value={28}>28</MenuItem>
                              <MenuItem value={29}>29</MenuItem>
                              <MenuItem value={30}>30+</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <Button sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 2, backgroundColor: 'darkgray', ":hover": {backgroundColor: 'green', color: "white"}}} component="div" variant="contained" onClick={ _submit } >Submit & Proceed</Button>
                </form>
                <Button sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 2, backgroundColor: 'darkgray', ":hover": {backgroundColor: 'green', color: "white"}}} component="div" variant="contained" onClick={()=> navigate('/employment')}>Back to Employment Information</Button>
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

