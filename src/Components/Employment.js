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
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Card from '@mui/material/Card';

const Employment = ()=> {
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [affiliationNYSE, setAffiliationNYSE] = useState(false);
  const [proSubcriber, setProSubcriber] = useState(false);
  const [directorOrShareholder, setDirectorOrShareholder] = useState(false);
  
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
    if(auth.id){
        setEmploymentStatus(auth.employmentStatus ? auth.employmentStatus : '')
        setAffiliationNYSE(auth.affiliationNYSE ? auth.affiliationNYSE : false)
        setProSubcriber(auth.proSubcriber ? auth.proSubcriber : false)
        setDirectorOrShareholder(auth.directorOrShareholder ? auth.directorOrShareholder : false)
      
    }
  }, [auth]);

  const _update = async(ev)=> {
    ev.preventDefault();
    dispatch(updateAuth({ employmentStatus, affiliationNYSE, proSubcriber, directorOrShareholder}));
    navigate('/employment')
  };

  const _submit = async(ev)=> {
    ev.preventDefault();
    dispatch(updateAuth({ employmentStatus, affiliationNYSE, proSubcriber, directorOrShareholder  }));
    navigate('/financials')
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
                <div className="circle active">
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
                <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> Employment Information </h1>
                <Typography sx={{display: 'flex', justifyContent: 'center'}} variant="h6" component="div">Please answer the below truthfully</Typography>
                  <div>
                    <Card sx={{padding: 2, display: 'flex', flexDirection: 'column'}}>
                      <div style={{display: 'flex', flex: 1, justifyContent: 'space-around', flexDirection: 'row'}}>
                        <div style={{flex: 1, margin: 1}}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', paddingBottom: '8px'}} variant="h7" component="div">Employment Status</Typography>
                          <FormControl sx={{width: '100%'}}>
                              <InputLabel>Employment Status</InputLabel>
                              <Select
                                value={employmentStatus}
                                label="Employment Status"
                                onChange={(ev) => setEmploymentStatus(ev.target.value)}
                              >
                                <MenuItem value={'Student'}>Student</MenuItem>
                                <MenuItem value={'Employed Full-Time'}>Employed Full-Time</MenuItem>
                                <MenuItem value={'Employed Part-Time'}>Employed Part-Time</MenuItem>
                                <MenuItem value={'Not Currently Employed'}>Not Currently Employed</MenuItem>
                                <MenuItem value={'Self Employed'}>Self Employed</MenuItem>
                              </Select>
                          </FormControl>
                        </div>
                      </div>

                      <div style={{flex: 1, margin: 10}}>
                        <Typography sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', paddingBottom: '8px'}} variant="h7" component="div">Affiliations</Typography>
                        <div style={{textAlign: 'center'}}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', paddingBottom: '2px'}} variant="h9" component="div">Are You or Spouse Employed or Associated with the NYSE?</Typography>
                          <Switch sx={{"& .MuiSwitch-switchBase.Mui-checked": {color: "green"}, "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {backgroundColor: 'lightgreen'}}} value={affiliationNYSE} onChange={(ev)=> setAffiliationNYSE(ev.target.checked)}/>
                          
                          <Typography sx={{display: 'flex', justifyContent: 'center', paddingBottom: '2px'}} variant="h9" component="div">Are you a director, 10% shareholder, or policy making officer of a publicly owned company?</Typography>
                          <Switch sx={{"& .MuiSwitch-switchBase.Mui-checked": {color: "green"}, "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {backgroundColor: 'lightgreen'}}}  value={directorOrShareholder} onChange={(ev)=> setDirectorOrShareholder(ev.target.checked)}/>

                          <Typography sx={{display: 'flex', justifyContent: 'center', paddingBottom: '2px'}} variant="h9" component="div">Are you a deemed a professional subscriber?</Typography>
                          <Switch sx={{"& .MuiSwitch-switchBase.Mui-checked": {color: "green"}, "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {backgroundColor: 'lightgreen'}}}  value={proSubcriber} onChange={(ev)=> setProSubcriber(ev.target.checked)}/>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <Button sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 2, backgroundColor: 'darkgray', ":hover": {backgroundColor: 'green', color: "white"}}} component="div" variant="contained" onClick={ _submit } >Submit & Proceed</Button>
                </form>
                <Button sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 2, backgroundColor: 'darkgray', ":hover": {backgroundColor: 'green', color: "white"}}} component="div" variant="contained" onClick={()=> navigate('/accountSetup')}>Back to Personal Information</Button>
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

export default Employment;








    <FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} label="Label" />
      <FormControlLabel required control={<Switch />} label="Required" />
      <FormControlLabel disabled control={<Switch />} label="Disabled" />
    </FormGroup>
 