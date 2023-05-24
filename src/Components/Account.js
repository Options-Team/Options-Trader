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


const Account = ()=> {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [countryOfCitizenship, setCountryOfCitizenship] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [DOBDate, setDOBDate] = useState('')
  const [DOBMonth, setDOBMonth] = useState('')
  const [DOBYear, setDOBYear] = useState('')
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
    if(auth.id){
      setFirstName(auth.firstName ? auth.firstName : '')
      setLastName(auth.lastName ? auth.lastName : '')
      setCountryOfCitizenship(auth.countryOfCitizenship ? auth.countryOfCitizenship : '')
      setAddress(auth.address ? auth.address : '')
      setCity(auth.city ? auth.city : '')
      setState(auth.state ? auth.state : '')
      setZipCode(auth.zipCode ? auth.zipCode : '')
      setEmail(auth.email ? auth.email : '')
      setPhone(auth.phone ? auth.phone : '')
      setDOBDate(auth.DOBDate ? auth.DOBDate : '')
      setDOBMonth(auth.DOBMonth ? auth.DOBMonth : '')
      setDOBYear(auth.DOBYear ? auth.DOBYear : '')
    }
  }, [auth]);

  const _update = async(ev)=> {
    ev.preventDefault();
    dispatch(updateAuth({ firstName, lastName, address, countryOfCitizenship, city, state, zipCode, email, phone, DOBDate, DOBMonth, DOBYear }));
    navigate('/account')
  };

  const _submit = async(ev)=> {
    ev.preventDefault();
    dispatch(updateAuth({ firstName, lastName, address, countryOfCitizenship, city, state, zipCode, email, phone, DOBDate, DOBMonth, DOBYear  }));
    navigate('/employment')
  };
  return (
    <div>
      {
        auth.id ? (
            <div>
              
              <div className="progress">
                <div className="circle active">
                  <span className="label">1</span>
                  <span className="title">Personal</span>
                </div>
                <span className="bar"></span>
                <div className="circle">
                  <span className="label">2</span>
                  <span className="title">Work</span>
                </div>
                <span className="bar"></span>
                <div className="circle">
                  <span className="label">3</span>
                  <span className="title">Financial</span>
                </div>
                <span className="bar"></span>
                <div className="circle">
                  <span className="label">4</span>
                  <span className="title">Finalize</span>
                </div>
              </div>
                <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> Personal Information </h1>
                
                <div>
                    
                    <form onSubmit={ _update }>
                  <div >
                    <Box sx={{ minWidth: 300 }}>
                    <div style={{ marginBottom: 8 }}/>
                    <TextField  label="First Name" variant="outlined" value={ firstName } onChange={ev => setFirstName(ev.target.value)} sx={{ minWidth: 300 }}/>
                    <div style={{ marginBottom: 8 }}/>
                    <TextField label="Last Name" variant="outlined" value={ lastName } onChange={ev => setLastName(ev.target.value)} sx={{ minWidth: 300 }}/>
                    <div style={{ marginBottom: 8 }}/>
                    <TextField label="Country" variant="outlined" value={ countryOfCitizenship } onChange={ev => setCountryOfCitizenship(ev.target.value)} sx={{ minWidth: 300 }}/>
                    <div style={{ marginBottom: 8 }}/>
                    <TextField label="Address" variant="outlined" value={ address } onChange={ev => setAddress(ev.target.value)} sx={{ minWidth: 300 }}/>
                    <div style={{ marginBottom: 8 }}/>
                    <TextField label="City" variant="outlined" value={ city } onChange={ev => setCity(ev.target.value)} sx={{ minWidth: 300 }}/>
                    <div style={{ marginBottom: 8 }}/>
                    <TextField label="State" variant="outlined" value={ state } onChange={ev => setState(ev.target.value)} sx={{ minWidth: 300 }}/>
                    <div style={{ marginBottom: 8 }}/>
                    <TextField label="Zip Code" variant="outlined" value={ zipCode } onChange={ev => setZipCode(ev.target.value)} sx={{ minWidth: 300 }}/>
                    <div style={{ marginBottom: 8 }}/>
                    <TextField label="E-mail" variant="outlined"  value={ email } onChange={ev => setEmail(ev.target.value)} sx={{ minWidth: 300 }}/>
                    <div style={{ marginBottom: 8 }}/>
                    <TextField label="Phone" variant="outlined" value={ phone } onChange={ev => setPhone(ev.target.value)} sx={{ minWidth: 300 }}/>
                    </Box>
                  </div>
                    <h6 >Date of Birth</h6>
                    <div style={{display: 'flex', justifyContent:'start', alignItems:'center'}}>
                        <Box sx={{ minWidth: 50 }}>
                        <FormControl  sx={{ minWidth: 85 }} >
                            <InputLabel id="demo-simple-select-label">Month</InputLabel>
                            <Select
                            value={DOBMonth}
                            label="Month"
                            onChange={(ev) => setDOBMonth(ev.target.value)}
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
                            </Select>
                        </FormControl>
                        </Box>
                        <div style={{alignSelf: 'center', fontSize: '24'}}> / </div> 
                        <Box sx={{ minWidth: 50 }}>
                        <FormControl sx={{ minWidth: 70 }} >
                            <InputLabel id="demo-simple-select-label">Day</InputLabel>
                            <Select
                            value={DOBDate}
                            label="Day"
                            onChange={(ev) => setDOBDate(ev.target.value)}
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
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={31}>31</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                        <div style={{alignSelf: 'center', fontSize: '24'}}> / </div> 
                        <Box sx={{ minWidth: 50 }}>
                        <FormControl sx={{ minWidth: 100 }}>
                            <InputLabel id="demo-simple-select-label">Year</InputLabel>
                            <Select
                            value={DOBYear}
                            label="Year"
                            onChange={(ev) => setDOBYear(ev.target.value)}
                            >
                            <MenuItem value={2002}>2002</MenuItem>
                            <MenuItem value={2001}>2001</MenuItem>
                            <MenuItem value={2000}>2000</MenuItem>
                            <MenuItem value={1999}>1999</MenuItem>
                            <MenuItem value={1998}>1998</MenuItem>
                            <MenuItem value={1997}>1997</MenuItem>
                            <MenuItem value={1996}>1996</MenuItem>
                            <MenuItem value={1995}>1995</MenuItem>
                            <MenuItem value={1994}>1994</MenuItem>
                            <MenuItem value={1993}>1993</MenuItem>
                            <MenuItem value={1992}>1992</MenuItem>
                            <MenuItem value={1991}>1991</MenuItem>
                            <MenuItem value={1990}>1990</MenuItem>
                            <MenuItem value={1989}>1989</MenuItem>
                            <MenuItem value={1988}>1988</MenuItem>
                            <MenuItem value={1987}>1987</MenuItem>
                            <MenuItem value={1986}>1986</MenuItem>
                            <MenuItem value={1985}>1985</MenuItem>
                            <MenuItem value={1984}>1984</MenuItem>
                            <MenuItem value={1983}>1983</MenuItem>
                            <MenuItem value={1982}>1982</MenuItem>
                            <MenuItem value={1981}>1981</MenuItem>
                            <MenuItem value={1980}>1980</MenuItem>
                            <MenuItem value={1979}>1979</MenuItem>
                            <MenuItem value={1978}>1978</MenuItem>
                            <MenuItem value={1977}>1977</MenuItem>
                            <MenuItem value={1976}>1976</MenuItem>
                            <MenuItem value={1975}>1975</MenuItem>
                            <MenuItem value={1974}>1974</MenuItem>
                            <MenuItem value={1973}>1973</MenuItem>
                            <MenuItem value={1972}>1972</MenuItem>
                            <MenuItem value={1971}>1971</MenuItem>
                            <MenuItem value={1970}>1970</MenuItem>
                            <MenuItem value={1969}>1969</MenuItem>
                            <MenuItem value={1968}>1968</MenuItem>
                            <MenuItem value={1966}>1967</MenuItem>
                            <MenuItem value={1966}>1966</MenuItem>
                            <MenuItem value={1965}>1965</MenuItem>
                            <MenuItem value={1964}>1964</MenuItem>
                            <MenuItem value={1963}>1963</MenuItem>
                            <MenuItem value={1962}>1962</MenuItem>
                            <MenuItem value={1961}>1961</MenuItem>
                            <MenuItem value={1960}>1960</MenuItem>
                            <MenuItem value={1959}>1959</MenuItem>
                            <MenuItem value={1958}>1958</MenuItem>
                            <MenuItem value={1955}>1957</MenuItem>
                            <MenuItem value={1956}>1956</MenuItem>
                            <MenuItem value={1955}>1955</MenuItem>
                            <MenuItem value={1954}>1954</MenuItem>
                            <MenuItem value={1953}>1953</MenuItem>
                            <MenuItem value={1952}>1952</MenuItem>
                            <MenuItem value={1951}>1951</MenuItem>
                            <MenuItem value={1950}>1950</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
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

export default Account;

