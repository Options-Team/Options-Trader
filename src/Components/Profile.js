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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Switch from '@mui/material/Switch';

const Profile = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(auth.firstName);
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
  const [avatar, setAvatar] = useState('')
  const [date,setDate] = useState(null);
  const [DOB,setDOB] = useState('');
  const [accountType,setAccountType] = useState('');
  const [SSID,setSSID] = useState('');
  const [employmentStatus,setEmploymentStatus] = useState('');
  const [proSubcriber,setProSubcriber] = useState('');
  const [affiliationNYSE,setAffiliationNYSE] = useState('');
  const [directorOrShareholder,setDirectorOrShareholder] = useState('');

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

  return (
    <div>
      {
        auth.id ? (
          <div style={{}}>
            <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Your Account</h1>
              <div>
                <Card sx={{padding: 2, display: 'flex', flexDirection: 'column'}}>
                  <div style={{display: 'flex', flex: 1, justifyContent: 'space-around', flexDirection: 'row'}}>
                    <Card sx={{flex: 1, margin: 1}}>
                      <Typography sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', paddingBottom: '8px'}} variant="h6" component="div">Personal Information</Typography>
                      <div style={{flex: 1, padding: '1rem', display: 'flex'}}>
                        <div style={{flex: 1}}>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}}  label="First Name" variant="outlined" value={ firstName ? firstName : auth.firstName } onChange={ev => setFirstName(ev.target.value)}/>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="Last Name" variant="outlined" value={ lastName ? lastName : auth.lastName } onChange={ev => setLastName(ev.target.value)}/>
                          <TextField label="E-mail" variant="outlined"  value={ email ? email : auth.email } onChange={ev => setEmail(ev.target.value)} sx={{flex: '1', width: '100%', padding: .5}}/>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="Phone" variant="outlined" value={ phone ? phone : auth.phone } onChange={ev => setPhone(ev.target.value)}/>
                        </div>

                        <div style={{flex: 1}}>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="Country" variant="outlined" value={ countryOfCitizenship ? countryOfCitizenship : auth.countryOfCitizenship } onChange={ev => setCountryOfCitizenship(ev.target.value)}/>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="Address" variant="outlined" value={ address ? address : auth.address } onChange={ev => setAddress(ev.target.value)}/>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="City" variant="outlined" value={ city ? city : auth.city } onChange={ev => setCity(ev.target.value)}/>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="State" variant="outlined" value={ state ? state : auth.state } onChange={ev => setState(ev.target.value)}/>
                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="Zip Code" variant="outlined" value={ zipCode ? zipCode : auth.zipCode } onChange={ev => setZipCode(ev.target.value)}/>
                        </div>

                        <div style={{flex: 1}}>
                            <TextField sx={{flex: '1', width: '100%', padding: .5}} label="Date of Birth" variant="outlined" value={ DOB ? DOB : auth.DOB } onChange={ev => setDOB(ev.target.value)}/>
                            <TextField sx={{flex: '1', width: '100%', padding: .5}} label="Account Type" variant="outlined" value={ auth.accountType } onChange={ev => setaccountType(ev.target.value)}/>
                            <TextField sx={{flex: '1', width: '100%', padding: .5}} label="SSID" variant="outlined" value={ auth.SSID ? auth.SSID : 'no SSID' } onChange={ev => setSSID(ev.target.value)}/>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div style={{display: 'flex', flex: 1, justifyContent: 'space-around', flexDirection: 'row'}}>
                    <Card sx={{flex: 1, margin: 1}}>
                      <Typography sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', paddingBottom: '8px'}} variant="h6" component="div">Employment Information</Typography>
                      <div style={{flex: 1, padding: '1rem', display: 'flex'}}>
                        <div style={{flex: 1, margin: 1}}>

                          <TextField sx={{flex: '1', width: '100%', padding: .5}} label="Employment Status" variant="outlined" value={ employmentStatus ? employmentStatus : auth.employmentStatus } onChange={ev => setEmploymentStatus(ev.target.value)}/>
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography sx={{display: 'flex', justifyContent: 'center', paddingBottom: '2px'}} variant="h9" component="div">Are You or Spouse Employed or Associated with the NYSE?</Typography>
                            <Switch sx={{"& .MuiSwitch-switchBase.Mui-checked": {color: "green"}, "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {backgroundColor: 'lightgreen'}}}  value={ affiliationNYSE ? affiliationNYSE : auth.affiliationNYSE } onChange={(ev)=> setProSubcriber(ev.target.checked)}/>
                          </div>

                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography sx={{display: 'flex', justifyContent: 'center', paddingBottom: '2px'}} variant="h9" component="div">Are you a director, 10% shareholder, or policy making officer of a publicly owned company?</Typography>
                            <Switch sx={{"& .MuiSwitch-switchBase.Mui-checked": {color: "green"}, "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {backgroundColor: 'lightgreen'}}}  value={ directorOrShareholder ? directorOrShareholder : auth.directorOrShareholder } onChange={(ev)=> setProSubcriber(ev.target.checked)}/>
                          </div>

                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography sx={{display: 'flex', justifyContent: 'center', paddingBottom: '2px'}} variant="h9" component="div">Are you a deemed a professional subscriber?</Typography>
                            <Switch sx={{"& .MuiSwitch-switchBase.Mui-checked": {color: "green"}, "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {backgroundColor: 'lightgreen'}}}  value={ proSubcriber ? proSubcriber : auth.proSubcriber } onChange={(ev)=> setProSubcriber(ev.target.checked)}/>
                          </div>
                        
                        </div>
                      </div>
                    </Card>
                  </div>
                </Card>

                <Card sx={{padding: 2, display: 'flex', flexDirection: 'column'}}>
                  <div style={{display: 'flex', flex: 1, justifyContent: 'space-around', flexDirection: 'row'}}>
                    <Card style={{flex: 1, margin: 1}}>
                      <Typography sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', paddingBottom: '8px'}} variant="h6" component="div">Financial Information</Typography>
                      <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Approximate Annual Income: ${auth.approximateAnnualIncome}</Typography>
                      <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Approximate Total Net Worth: ${auth.approximateTotalNetWorth}</Typography>
                      <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Approximate Liquid Net Worth: ${auth.approximateLiquidNetWorth}</Typography>
                      <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Source of Income: {auth.sourceOfIncome}</Typography>
                      <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Account Funding Method: {auth.accountFundingMethod}</Typography>
                      <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Years of Trading Experience: {auth.tradingYearsOfExperience}</Typography>
                      <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Account Funds: {auth.tradingFunds}</Typography>
                    </Card>
                  </div>
                </Card>
              </div>
            <Button sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 2, backgroundColor: 'darkgray', ":hover": {backgroundColor: 'green', color: "white"}}} component="div" variant="contained" onClick={ _update }>Update Account</Button>
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

export default Profile;


// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateAuth } from '../store';
// import { useNavigate, Link } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// const Profile = ()=> {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('')
//   const [address, setAddress] = useState('')
//   const [city, setCity] = useState('')
//   const [countryOfCitizenship, setCountryOfCitizenship] = useState('')
//   const [state, setState] = useState('')
//   const [zipCode, setZipCode] = useState('')
//   const [email, setEmail] = useState('')
//   const [phone, setPhone] = useState('')
//   const [DOBDate, setDOBDate] = useState('')
//   const [DOBMonth, setDOBMonth] = useState('')
//   const [DOBYear, setDOBYear] = useState('')
//   const ref = useRef(null);
//   const [avatar, setAvatar] = useState('')
//   const { auth } = useSelector(state => state);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [date,setDate] = useState(null);

//   useEffect(()=> {
//     if(auth.id){
//       setFirstName(auth.firstName ? auth.firstName : '')
//       setLastName(auth.lastName ? auth.lastName : '')
//       setCountryOfCitizenship(auth.countryOfCitizenship ? auth.countryOfCitizenship : '')
//       setAddress(auth.address ? auth.address : '')
//       setCity(auth.city ? auth.city : '')
//       setState(auth.state ? auth.state : '')
//       setZipCode(auth.zipCode ? auth.zipCode : '')
//       setEmail(auth.email ? auth.email : '')
//       setPhone(auth.phone ? auth.phone : '')
//       setDOBDate(auth.DOBDate ? auth.DOBDate : '')
//       setDOBMonth(auth.DOBMonth ? auth.DOBMonth : '')
//       setAvatar(auth.avatar ? auth.avatar : '')
//       setDOBYear(auth.DOBYear ? auth.DOBYear : '')
//       setDate(date ? date : null)
//     }
//   }, [auth]);


//   const _update = async(ev)=> {
//     ev.preventDefault();
    
//     if(date){
//       dispatch(updateAuth({ firstName, lastName, address, countryOfCitizenship, city, state, zipCode, email, phone, DOBDate: date.$D, DOBMonth: date.$M + 1, DOBYear: date.$y, avatar }));
//     navigate('/account')
//     } else {
//       console.log(avatar);
//       dispatch(updateAuth({ firstName, lastName, address, countryOfCitizenship, city, state, zipCode, email, phone, avatar }));
//     navigate('/account')
//     }
//   };

//   const _submit = async(ev)=> {
//     ev.preventDefault();

//     if(date){
//       dispatch(updateAuth({ firstName, lastName, address, countryOfCitizenship, city, state, zipCode, email, phone, DOBDate: date.$D, DOBMonth: date.$M + 1, DOBYear: date.$y, avatar }));
//     navigate('/employment')
//     } else {
//       dispatch(updateAuth({ firstName, lastName, address, countryOfCitizenship, city, state, zipCode, email, phone, avatar }));
//       navigate('/employment')
//     }
//   };

  
//   return (
//     <div>
//       {
//         auth.id ? (
//             <div>
              
//               <div className="progress">
//                 <div className="circle active">
//                   <span className="label">1</span>
//                   <span className="title">Personal</span>
//                 </div>
//                 <span className="bar"></span>
//                 <div className="circle">
//                   <span className="label">2</span>
//                   <span className="title">Work</span>
//                 </div>
//                 <span className="bar"></span>
//                 <div className="circle">
//                   <span className="label">3</span>
//                   <span className="title">Financial</span>
//                 </div>
//                 <span className="bar"></span>
//                 <div className="circle">
//                   <span className="label">4</span>
//                   <span className="title">Finalize</span>
//                 </div>
//               </div>
//                 <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> Personal Information </h1>
//                 <div>
                    
//                     <form onSubmit={ _update }>
//                   <div >
//                     <Box sx={{ minWidth: 300 }}>
//                       <Card sx={{ display: 'flex', justifyContent: 'space-around', paddingTop: 5, paddingBottom: 5}}>
                     
//                             <TextField sx={{flex: '1', width: 400}}  label="First Name" variant="outlined" value={ firstName } onChange={ev => setFirstName(ev.target.value)} sx={{ minWidth: 300 }}/>
                           
//                             <TextField sx={{flex: '1', width: 400}} label="Last Name" variant="outlined" value={ lastName } onChange={ev => setLastName(ev.target.value)} sx={{ minWidth: 300 }}/>
                           
//                       </Card>
//                     <div style={{ marginBottom: 8 }}/>
//                     <img style={{height: 'auto', width:400, float: 'right'}} src='static/dollabillz.jpeg'></img>
                    
//                     <TextField label="Country" variant="outlined" value={ countryOfCitizenship } onChange={ev => setCountryOfCitizenship(ev.target.value)} sx={{ minWidth: 300 }}/>
//                     <div style={{ marginBottom: 8 }}/>
//                     <TextField label="Address" variant="outlined" value={ address } onChange={ev => setAddress(ev.target.value)} sx={{ minWidth: 300 }}/>
//                     <div style={{ marginBottom: 8 }}/>
//                     <TextField label="City" variant="outlined" value={ city } onChange={ev => setCity(ev.target.value)} sx={{ minWidth: 300 }}/>
//                     <div style={{ marginBottom: 8 }}/>
//                     <TextField label="State" variant="outlined" value={ state } onChange={ev => setState(ev.target.value)} sx={{ minWidth: 300 }}/>
//                     <div style={{ marginBottom: 8 }}/>
//                     <TextField label="Zip Code" variant="outlined" value={ zipCode } onChange={ev => setZipCode(ev.target.value)} sx={{ minWidth: 300 }}/>
//                     <div style={{ marginBottom: 8 }}/>
//                     <TextField label="E-mail" variant="outlined"  value={ email } onChange={ev => setEmail(ev.target.value)} sx={{ minWidth: 300 }}/>
//                     <div style={{ marginBottom: 8 }}/>
//                     <TextField label="Phone" variant="outlined" value={ phone } onChange={ev => setPhone(ev.target.value)} sx={{ minWidth: 300 }}/>
//                     <div className="input-group mb-3">
//                       <label className="input-group-text">Upload Photo</label>
//                       {/* <input type="file" ref={ ref } className="form-control" id="inputGroupFile02" /> */}
//                       <input type="file" onChange={ ev => {
//                         const file = ev.target.files[0];
//                         const reader = new FileReader();
//                         reader.readAsDataURL(file);
//                         reader.addEventListener('load', () => {
//                           setAvatar(reader.result)
//                         })
//                       } } className="form-control" id="inputGroupFile02" />
//                       { !!avatar && <img src={ avatar } style={{ width: 100}} /> }
//                     </div>
                    
//                     </Box>
//                   </div>
//                     <h6 >Date of Birth</h6>
//                     {auth.DOBYear ? <span style={{ marginTop: 0, marginLeft: 15 }}>{auth.DOB}</span> : null}
//                       <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DatePicker
//                             sx={{width: 300, marginLeft: 2}}
//                             label="Enter DOB"
//                             value={date}
//                             onChange={(newDate)=>setDate(newDate)}
//                         />
//                       </LocalizationProvider>

//                     <Button onClick={ _update } >Save Profile</Button><Button onClick={ _submit } >Submit & Proceed</Button>
//                     </form>
//                 </div>
                
//             </div>
        
//         )  : (
//             <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
//                 <h1>Can't Update If You're Not Logged In!</h1>
//                 <div>
//                     <Link to={`/register`}>Register Here</Link> or <Link to='/login'> Login </Link>
//                 </div>
//             </div>
//           )
//         } 
     
//     </div>
//   );
// };

// export default Profile;

