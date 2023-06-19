import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuth } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';


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
  const ref = useRef(null);
  const [avatar, setAvatar] = useState('')
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date,setDate] = useState(null);

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
      setAvatar(auth.avatar ? auth.avatar : '')
      setDOBYear(auth.DOBYear ? auth.DOBYear : '')
      setDate(date ? date : null)
    }
  }, [auth]);


  const _update = async(ev)=> {
    ev.preventDefault();
    
    if(date){
      dispatch(updateAuth({ firstName, lastName, address, countryOfCitizenship, city, state, zipCode, email, phone, DOBDate: date.$D, DOBMonth: date.$M + 1, DOBYear: date.$y, avatar }));
    navigate('/account')
    } else {
      console.log(avatar);
      dispatch(updateAuth({ firstName, lastName, address, countryOfCitizenship, city, state, zipCode, email, phone, avatar }));
    navigate('/account')
    }
  };

  const _submit = async(ev)=> {
    ev.preventDefault();

    if(date){
      dispatch(updateAuth({ firstName, lastName, address, countryOfCitizenship, city, state, zipCode, email, phone, DOBDate: date.$D, DOBMonth: date.$M + 1, DOBYear: date.$y, avatar }));
    navigate('/employment')
    } else {
      dispatch(updateAuth({ firstName, lastName, address, countryOfCitizenship, city, state, zipCode, email, phone, avatar }));
      navigate('/employment')
    }
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
              <div style={{}}>
                <form onSubmit={ _update }>
                <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> Personal Information </h1>
                <Typography sx={{display: 'flex', justifyContent: 'center'}} variant="h6" component="div">Please enter your first and last name as they appear on your government issued identification</Typography>
                  <div>
                    <Card sx={{padding: 2, display: 'flex', flexDirection: 'column'}}>
                      <div style={{display: 'flex', flex: 1, justifyContent: 'space-around', flexDirection: 'row'}}>
                        <div style={{flex: 1, margin: 1}}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', paddingBottom: '8px'}} variant="h7" component="div">Identification</Typography>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}}  label="First Name" variant="outlined" value={ firstName } onChange={ev => setFirstName(ev.target.value)}/>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="Last Name" variant="outlined" value={ lastName } onChange={ev => setLastName(ev.target.value)}/>
                          <TextField label="E-mail" variant="outlined"  value={ email } onChange={ev => setEmail(ev.target.value)} sx={{flex: '1', width: '100%', padding: .5}}/>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="Phone" variant="outlined" value={ phone } onChange={ev => setPhone(ev.target.value)}/>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                sx={{flex: '1', width: '100%', padding: .5}}
                                label="Date of Birth"
                                value={date}
                                onChange={(newDate)=>setDate(newDate)}
                            />
                          </LocalizationProvider>
                        </div>

                        <div style={{flex: 1, margin: 1}}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', paddingBottom: '8px'}} variant="h7" component="div">Location</Typography>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="Country" variant="outlined" value={ countryOfCitizenship } onChange={ev => setCountryOfCitizenship(ev.target.value)}/>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="Address" variant="outlined" value={ address } onChange={ev => setAddress(ev.target.value)}/>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="City" variant="outlined" value={ city } onChange={ev => setCity(ev.target.value)}/>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="State" variant="outlined" value={ state } onChange={ev => setState(ev.target.value)}/>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="Zip Code" variant="outlined" value={ zipCode } onChange={ev => setZipCode(ev.target.value)}/>
                        </div>
                      </div>

                      <div style={{flex: 1, margin: 10}}>
                        <Typography sx={{fontWeight: 'bold', paddingBottom: '8px'}} variant="h7" component="div">Upload Profile Picture: </Typography>
                        <div style={{margin: 2}} className="input-group mb-3">
                          <input type="file" onChange={ ev => {
                            const file = ev.target.files[0];
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.addEventListener('load', () => {
                              setAvatar(reader.result)
                            })
                            } } className="form-control" id="inputGroupFile02"
                          />
                        </div>
                        { !!avatar && <img src={ avatar } style={{ width: 100}} /> }
                      </div>
                    </Card>
                  </div>
                  <Button sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 2, backgroundColor: 'darkgray', ":hover": {backgroundColor: 'green', color: "white"}}} component="div" variant="contained"  onClick={ _submit } >Submit & Proceed</Button>
                </form>
              </div>
            </div>
        
        )  : (
            <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
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

