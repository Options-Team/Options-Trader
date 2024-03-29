import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { POLYGON_API_KEY, X_RapidAPI_Key } from '../../secrets';
import TextField from '@mui/material/TextField';

//import { format } from 'date-fns';
//import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import "react-datepicker/dist/react-datepicker.css";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Stocks = () => {
    const [top25Ticker, setTop25Ticker] = useState([])
    const [stockTicker, setStockTicker] = useState('')
    const [companyTicker, setCompanyTicker] = useState('')
    const [expDate, setExpDate] = useState('')
    const [optionType, setOptionType] = useState('')
    const [strikePrice, setStrikePrice] = useState('')
    const [currentTicker, setCurrentTicker] = useState('')
    const [date,setDate] = useState(null);

    useEffect(()=>{
        if(date === null){
            console.log(date);
            
        }
        else{
            console.log(date);
            console.log(date.$d);

        }
    },[date]);

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
        const zeros =  8 - Number(String(strike1000).length)
        let stringOfZeroes = ''
        for(let i = 0; i < zeros; i++) {
            stringOfZeroes += '0'
        }
        const strikeNumber = stringOfZeroes + String(strikePrice * 1000)
        const optionTypeLetter = optionType[0].toUpperCase()

        console.log(expDate)
        const mmddyy = expDate.split('/')
        const year = String(mmddyy[2].slice(2, 4))
        const day =  String(mmddyy[1])
        const month =  String(mmddyy[0].length === 1 ? '0' + mmddyy[0] : mmddyy[0])
        const formattedExpDate = year + month + day
        console.log(companyTicker, optionTypeLetter, strikeNumber, expDate, formattedExpDate )
        

        try {
            console.log(`O:${companyTicker}${formattedExpDate}${optionTypeLetter}${strikeNumber}?apiKey=${POLYGON_API_KEY}`)
            const optionContractResponse = await axios.get(`https://api.polygon.io/v3/reference/options/contracts/O:${companyTicker}${formattedExpDate}${optionTypeLetter}${strikeNumber}?apiKey=${POLYGON_API_KEY}`)
            console.log(`O:${companyTicker}${formattedExpDate}${optionTypeLetter}${strikeNumber}?apiKey=${POLYGON_API_KEY}`)
            console.log(optionContractResponse)
                                                          //https://api.polygon.io/v3/reference/options/contracts/O:EVRI240119C00002500?apiKey=_tgq_S7FLpBJrpHpb5QUUxHyUygcpBOp
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
            console.log(getTop25TrendingResponse.data.finance.result[0].quotes)
            console.log(top25quotes)
           setTop25Ticker(top25quotes)

           console.log(top25Ticker)
        } catch (error) {
            console.error(error);
        }   
      }

    return( 
    <div>

        <div className='ticker-tape'>
            <div className='ticker'>
                { top25Ticker ? top25Ticker.map((ticker, idx) => {
                    return (
                        <div className='ticker__item' key={idx}>{ticker.symbol}: {ticker.regularMarketPrice}</div>
                    )
                }) : ''}
            </div>
        </div>
        
       {/* <h6 className='stockExchanges' width='200%'>{top25Ticker ?  top25Ticker : ''}</h6> */}
      
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
                        component='picture'
                        sx={{ height: 140 }}
                        image={currentTicker.branding.icon_url}
                        src={currentTicker.branding.icon_url}
                        url={currentTicker.branding.icon_url}
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

                  <div style={{ display:'flex', flexDirection: 'row', justifyContent:'center', alignItems: 'center' }}>
                  <div style={{alignSelf: 'center', fontSize: '20'}}>I'm looking for a</div> 
                  <TextField label="Type" variant="outlined" value={ optionType } onChange={ev => setOptionType(ev.target.value)} style={{ width: 75, alignItems: 'center',  alignContent: 'center'}}/>
                  <div style={{alignSelf: 'center', fontSize: '20'}}>option on </div> 
                  <TextField label="Ticker" variant="outlined" value={ companyTicker } onChange={ev => setCompanyTicker(ev.target.value)} style={{ width: 100, alignItems: 'center',  alignContent: 'center'}}/>
                  <div style={{alignSelf: 'center', fontSize: '20'}}>with an expiration date of </div> 
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']} style={{ width: 200}}>
                            <DatePicker label="Basic date picker" value={expDate} onChange={(ev)=>setExpDate(`${String(ev.$M + 1)}/${ev.$D.length === 1 ? '0' + ev.$D : String(ev.$D)}/${ev.$y}`)} />
                        </DemoContainer>
                    </LocalizationProvider> */}
                     <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DatePicker
                        label="Basic date picker" 
                        value={expDate} 
                        onChange={(ev)=>setExpDate(`${String(ev.$M + 1)}/${ev.$D.length === 1 ? '0' + ev.$D : String(ev.$D)}/${ev.$y}`)}
                    />
                    </LocalizationProvider>
                
                  <div style={{alignSelf: 'center', fontSize: '20'}}> with a strike price of </div> 
                  <TextField label="Strike Price" variant="outlined" value={ strikePrice } onChange={ev => setStrikePrice(ev.target.value)} style={{display: 'flex', alignSelf: 'start', width: "20%", marginLeft:'1%' }} /> 

                  
                  </div>
      
                  <Button onClick={ getOptionContract } disabled={ !optionType || !companyTicker || !strikePrice}>Make My Option Contract!</Button>
                </form>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                <DatePicker
                    label="Controlled picker"
                    value={date}
                    onChange={(newDate)=>setDate(newDate)}
                />
                </LocalizationProvider>
    </div>
    )
}

export default Stocks




    
