import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { POLYGON_API_KEY, X_RapidAPI_Key } from '../../secrets';
import TextField from '@mui/material/TextField';
import { BasicDatePicker } from './DatePicker';
//import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
//import 'react-day-picker/dist/style.css';
// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const Stocks = () => {
    const [top25Ticker, setTop25Ticker] = useState('')
    const [stockTicker, setStockTicker] = useState('')
    const [companyTicker, setCompanyTicker] = useState('')
    const [expDate, setExpDate] = useState('')
    const [optionType, setOptionType] = useState('')
    const [strikePrice, setStrikePrice] = useState('')
    const [currentTicker, setCurrentTicker] = useState('')

    const tickerAPICall =  async () => {
        try {
            const tickerResponse = await axios.get(`https://api.polygon.io/v3/reference/tickers/${stockTicker}?apiKey=${POLYGON_API_KEY}`)
            console.log(tickerResponse)
           setCurrentTicker(tickerResponse.data.results)
        } catch (error) {
            console.log(error)
        }
    }

    const getOptionContract = async () => {
       
        const strike1000 = strikePrice * 1000
       // console.log(String(strike1000).length, strike1000)
        const zeros =  8 - Number(String(strike1000).length)
        console.log(zeros)
        let stringOfZeroes = ''
        for(let i = 0; i < zeros; i++) {
            stringOfZeroes += '0'
        }
        console.log(stringOfZeroes)
        const strikeNumber = stringOfZeroes + String(strikePrice * 1000)
        const optionTypeLetter = optionType[0].toUpperCase()

        // console.log(expDate)
        // const mmddyy = expDate.split('/')
        // const year = String(mmddyy[2].slice(2, 4))
        // const day =  String(mmddyy[1])
        // const month =  String(mmddyy[0])
        // const formattedExpDate = year + month + day
        console.log(companyTicker, optionTypeLetter, strikeNumber)
        

        try {
            const optionContractResponse = await axios.get(`https://api.polygon.io/v3/reference/options/contracts/O:${companyTicker}${formattedExpDate}${optionTypeLetter}${strikeNumber}?as_of=2023-06-10&apiKey=${POLYGON_API_KEY}`)
            console.log(optionContractResponse)
        } catch (error) {
            console.log(error)
        }
    }
    currentTicker ?  console.log(currentTicker.name) : ''

    const getTop25TrendingStocksOptions = {
        method: 'GET',
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers',
        params: {region: 'US'},
        headers: {
          'X-RapidAPI-Key': `${X_RapidAPI_Key}`,
          'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
      };

      const getTop25Trending = async () => {
        try {
            const getTop25TrendingResponse = await axios.request(getTop25TrendingStocksOptions);
            console.log(getTop25TrendingResponse.data);
            const top25quotes = getTop25TrendingResponse.data.finance.result[0].quotes
            let top25SymbolsAndPrices = ''
            top25quotes.forEach(quote => {
                top25SymbolsAndPrices += ` ${quote.symbol}: ${quote.regularMarketPrice} `
            })
            setTop25Ticker(top25SymbolsAndPrices)

        } catch (error) {
            console.error(error);
        }
      }


      
      
   
    return( 
    <>
     {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Basic date picker" />
      </DemoContainer>
    </LocalizationProvider> */}
        
        
       <h5 className='stockExchanges'>{top25Ticker ?  top25Ticker : ''}</h5>
       <form onSubmit={ tickerAPICall } style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                  <div style={{ marginBottom: 8 }}/>
                  <div style={{ display:'flex', flexDirection: 'row', justifyContent:'center' }}>           
    
                  <div style={{alignSelf: 'center', fontSize: '24'}}> I want to call the API for the following stock ticker:</div> 
                  <TextField label="Stock Ticker" variant="outlined" value={ stockTicker } onChange={ev => setStockTicker(ev.target.value)} style={{display: 'flex', alignSelf: 'start', width: "20%", marginLeft:'1%', marginRight:'1%' }} /> 
                  </div>

                  <Button onClick={ tickerAPICall } disabled={ !stockTicker}>Get Ticker API Call!</Button>
                </form> 
                <div>
                    { currentTicker ? 'Company: ' + currentTicker.name + ' market cap: ' + currentTicker['market_cap'] + ' website: ' + currentTicker['homepage_url'] + ' desc: ' + currentTicker.description : ''}
                </div>
                    <Button onClick={ getTop25Trending } >Fill The Ticker!</Button>
        
                {currentTicker ? <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        src={currentTicker.branding.logo_url}
                        title="Ticker Logo"
                    />
                    
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {currentTicker.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {currentTicker.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                    </Card> : ''} 
            




                <form onSubmit={ getOptionContract } style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                  <div style={{ marginBottom: 8 }}/>
                  <div style={{ display:'flex', flexDirection: 'row', justifyContent:'center' }}>
                  <div style={{alignSelf: 'center', fontSize: '24'}}>I'm looking for a </div> 
                  <TextField label="Type" variant="outlined" value={ optionType } onChange={ev => setOptionType(ev.target.value)} style={{ width: "30%", alignItems: 'center',  alignContent: 'center', marginLeft:'1%'}}/>
                  <div style={{alignSelf: 'center', fontSize: '24'}}>option on </div> 
                  <TextField label="Ticker" variant="outlined" value={ companyTicker } onChange={ev => setCompanyTicker(ev.target.value)} style={{ width: "30%", alignItems: 'center',  alignContent: 'center', marginLeft:'1%'}}/>
                  <div style={{alignSelf: 'center', fontSize: '24'}}>with an expiration date of </div> 
                 {/* { BasicDatePicker()} */}
                 <DayPicker
                    mode="single"
                    value={ expDate } 
                    onChange={ev => setExpDate(ev.target.value)} 
                    style={{ width: "30%", marginLeft:'1%', marginRight:'1%' }}
                />
                {/* <DatePicker label="Exp. Date" value={ expDate } onChange={ev => setExpDate(ev.target.value)} style={{ width: "30%", marginLeft:'1%', marginRight:'1%' }}/>  */}
                  <div style={{alignSelf: 'center', fontSize: '24'}}> with a strike price of </div> 
                  <TextField label="Strike Price" variant="outlined" value={ strikePrice } onChange={ev => setStrikePrice(ev.target.value)} style={{display: 'flex', alignSelf: 'start', width: "20%", marginLeft:'1%', marginRight:'1%' }} /> 
                  
                  </div>
      
                  <Button onClick={ getOptionContract } disabled={ !optionType || !companyTicker || !strikePrice}>Make My Option Contract!</Button>
                </form>
    </>
    )
}

export default Stocks

