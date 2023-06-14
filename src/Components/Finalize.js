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
import { Typography, Card } from '@mui/material';


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
                <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> Finalize Information & Start Trading! </h1>
                <h5 >Information to go over</h5>
                <hr />
                <h6 >We are required to collect certain financial information for tax purposes</h6>
                <Card>
                
                    <Typography>First Name: {auth.firstName}</Typography>
                    <Typography>Last Name: {auth.lastName}</Typography>
                    <Typography>Phone: {auth.phone}</Typography>
                    <Typography>Country: {auth.countryOfCitizenship}</Typography>
                    <Typography>Address: {auth.address}</Typography>
                    <Typography>City: {auth.city}</Typography>
                    <Typography>State: {auth.state}</Typography>
                    <Typography>Zip: {auth.zipCode}</Typography>
                    <Typography>DOB: {auth.DOB}</Typography>
                    <Typography>Account Type: {auth.accountType}</Typography>
                    <Typography>SSID: {auth.SSID}</Typography>
                    <Typography>Employment Status: {auth.employmentStatus}</Typography>
                    <Typography>NYSE Affiliations: {String(auth.affiliationNYSE) === 'true' ? 'Yes' : 'No'}</Typography>
                    <Typography>Professional Subscriber: {String(auth.proSubcriber) === 'true' ? 'Yes' : 'No'}</Typography>
                    <Typography>Director or Shareholder: {String(auth.directorOrShareholder) === 'true' ? 'Yes' : 'No'}</Typography>
                    <Typography>Approximate Annual Income: ${auth.approximateAnnualIncome}</Typography>
                    <Typography>Approximate Total Net Worth: ${auth.approximateTotalNetWorth}</Typography>
                    <Typography>Approximate Liquid Net Worth: ${auth.approximateLiquidNetWorth}</Typography>
                    <Typography>Source of Income: {auth.sourceOfIncome}</Typography>
                    <Typography>Account Funding Method: {auth.accountFundingMethod}</Typography>
                    <Typography>Years of Trading Experience: {auth.tradingYearsOfExperience}</Typography>
                    <Typography>Account Funds: {auth.tradingFunds}</Typography>
               
                </Card>
                {/* <Link to={`/financials`}>Back to Financials</Link>  */}
                {/* <Button onClick={ () => navigate('/financials') } >Back to Financials</Button>
                <Button onClick={ ()=> navigate('/launch') } >Create My Account</Button> */}

                <Button><Link to='/financials'> Back to Financials </Link></Button>
                <Button><Link to='/launch'>Create My Account  </Link></Button>
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
