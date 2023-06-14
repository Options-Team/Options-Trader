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

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

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
                <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> Personal Information </h1>
                
                <div>
                    
                    <form onSubmit={ _update }>
                   
                      <h3 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Employment Information</h3>
                      <Button sx={{width: 100}}onClick={()=> navigate('/account')}>Back</Button>
                      <h6 sx={{display: 'flex'}} >Employment</h6>
                      <hr />
                      <div style={{display: 'flex', justifyContent:'start', alignItems:'start', flexDirection:'column'}}>
                          <Box sx={{ minWidth: 50 }}>
                          <FormControl sx={{ minWidth: 400 }}>
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
                          </Box>
                          <h6 >Affiliations</h6>
                          <hr />
                        
                <h4 >Are You or Spouse Employed or Associated with the NYSE?</h4>
                <Switch value={affiliationNYSE} onChange={(ev)=> setAffiliationNYSE(ev.target.checked)}/>
                
                <h4 >Are you a director, 10% shareholder, or policy making officer of a publicly owned company?</h4>
                <Switch value={directorOrShareholder} onChange={(ev)=> setDirectorOrShareholder(ev.target.checked)}/>

                <h4 >Are you a deemed a professional subscriber?</h4>
                <Switch value={proSubcriber} onChange={(ev)=> setProSubcriber(ev.target.checked)}/>
   
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

export default Employment;








    <FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} label="Label" />
      <FormControlLabel required control={<Switch />} label="Required" />
      <FormControlLabel disabled control={<Switch />} label="Disabled" />
    </FormGroup>
 