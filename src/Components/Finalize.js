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


const Finalize = ()=> {


  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

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
                <div className="circle done">
                  <span className="label">3</span>
                  <span className="title">Financial</span>
                </div>
                <span className="bar done"></span>
                <div className="circle active">
                  <span className="label">4</span>
                  <span className="title">Finalize</span>
                </div>
              </div>

              <div style={{}}>
                <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> Review Information & Start Trading! </h1>
                <Typography sx={{display: 'flex', justifyContent: 'center'}} variant="h6" component="div">Please review all information carefully before proceeding</Typography>
                  <div>
                    <Card sx={{padding: 2, display: 'flex', flexDirection: 'column'}}>
                      <div style={{display: 'flex', flex: 1, justifyContent: 'space-around', flexDirection: 'row'}}>
                        <Card style={{flex: 1, margin: 1}}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', paddingBottom: '8px'}} variant="h7" component="div">Personal Information</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">First Name: {auth.firstName}</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Last Name: {auth.lastName}</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Phone: {auth.phone}</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Country: {auth.countryOfCitizenship}</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Address: {auth.address}</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">City: {auth.city}</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">State: {auth.state}</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Zip: {auth.zipCode}</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">DOB: {auth.DOB}</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Account Type: {auth.accountType}</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">SSID: {auth.SSID}</Typography>
                        </Card>
                        <Card style={{flex: 1, margin: 1}}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', paddingBottom: '8px'}} variant="h7" component="div">Employment Status</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Employment Status: {auth.employmentStatus}</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">NYSE Affiliations: {String(auth.affiliationNYSE) === 'true' ? 'Yes' : 'No'}</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Professional Subscriber: {String(auth.proSubcriber) === 'true' ? 'Yes' : 'No'}</Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'flex-start', padding: '0px 8px 2px 8px'}} variant="h9" component="div">Director or Shareholder: {String(auth.directorOrShareholder) === 'true' ? 'Yes' : 'No'}</Typography>
                        </Card>
                        <Card style={{flex: 1, margin: 1}}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', paddingBottom: '8px'}} variant="h7" component="div">Financial Information</Typography>
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
                <Button sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 2, backgroundColor: 'darkgray', ":hover": {backgroundColor: 'green', color: "white"}}} component="div" variant="contained" onClick={()=> navigate('/account')}>Create My Account</Button>
                <Button sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 2, backgroundColor: 'darkgray', ":hover": {backgroundColor: 'green', color: "white"}}} component="div" variant="contained" onClick={()=> navigate('/financials')}>Back to Financial Information</Button>
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

export default Finalize;
