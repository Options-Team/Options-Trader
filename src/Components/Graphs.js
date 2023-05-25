import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuth } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { POLYGON_API_KEY, X_RapidAPI_Key } from '../../secrets';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {ResponsiveLine} from '@nivo/line';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const dat = [
    {
      "id": "AAPL",
      "color": "hsl(55, 70%, 50%)",
      "data": [
        {
          "x": "May 09",
          "y": 171.77
        },
        {
          "x": "May 10",
          "y": 173.56
        },
        {
          "x": "May 11",
          "y": 173.75
        },
        {
          "x": "May 12",
          "y": 172.57
        },
        {
          "x": "May 15",
          "y": 172.07
        },
        {
          "x": "May 16",
          "y": 172.07
        },
        {
          "x": "May 17",
          "y": 172.69
        },
        {
          "x": "May 18",
          "y": 175.05
        },
        {
          "x": "May 19",
          "y": 175.96
        },
        {
          "x": "May 22",
          "y": 174.20
        },
        {
          "x": "May 23",
          "y": 171.56
        },
        {
          "x": "May 24",
          "y": 171.30
        }
      ]
    },
  ]

const MyResponsiveLine = ({data}) => (
  <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Date',
          legendOffset: 36,
          legendPosition: 'middle'
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Price',
          legendOffset: -40,
          legendPosition: 'middle'
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
          {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
  />
)

const Graphs = ()=> {
    

  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stockTicker, setStockTicker] = useState('')
  const [data, setData] = useState([])
  const [currentTicker, setCurrentTicker] = useState('')
 
const weekDates = ['2023-05-23', '2023-05-22', '2023-05-19', '2023-05-18', '2023-05-17','2023-05-16', '2023-05-15', '2023-05-12', '2023-05-11', '2023-05-10', '2023-05-09', '2023-05-08', '2023-05-05', '2023-05-04', '2023-05-03', '2023-05-02', '2023-05-01','2023-04-28','2023-04-27','2023-04-26','2023-04-25','2023-04-24','2023-04-21','2023-04-20','2023-04-19','2023-04-18','2023-04-17','2023-04-14','2023-04-13','2023-04-12','2023-04-11','2023-04-10','2023-04-06','2023-04-05','2023-04-04','2023-04-03']

const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol: `${stockTicker}`,
      outputsize: 'compact',
      datatype: 'json'
    },
    headers: {
      'X-RapidAPI-Key': `${X_RapidAPI_Key}`,
      'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
    }
  };
  

  const tickerAPICall =  async (ev) => {
    ev.preventDefault()
    try {
        let lastMonthArrayForGraph = []
        const tickerResponse = await axios.request(options)
        
        
        for(let i = 0; i <= weekDates.length - 1; i++){
            lastMonthArrayForGraph.push(
                {
                "x": weekDates[weekDates.length - 1 - i].split('23-0')[1],
                "y": tickerResponse.data['Time Series (Daily)'][`${weekDates[weekDates.length - 1 - i]}`]['4. close']
            }
            )

        }

        console.log(lastMonthArrayForGraph)
        const dataForGraph = [
            {
              "id": `${stockTicker ? stockTicker : ''}`,
              "color": "hsl(55, 70%, 50%)",
              "data": lastMonthArrayForGraph
            },
          ]
          setData(dataForGraph)

          const tickerInfoResponse = await axios.get(`https://api.polygon.io/v3/reference/tickers/${stockTicker}?apiKey=${POLYGON_API_KEY}`)
            console.log(tickerInfoResponse)
           setCurrentTicker(tickerInfoResponse.data.results)
        
            } catch (error) {
              console.log(error)
          }
        }

// useEffect(()=> {
//    }, [stockTicker]);

  const _update = async(ev)=> {
    ev.preventDefault();
    dispatch(updateAuth({  }));
    navigate('/account')
  };

  const _submit = async(ev)=> {
    ev.preventDefault();
    dispatch(updateAuth({   }));
    navigate('/employment')
  };
  return (
    <div>
      {
        auth.id ? (
            <div>
              
                <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> Graphs </h1>
                <div>
                <form onSubmit={ tickerAPICall } style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                  <div style={{ marginBottom: 8 }}/>
                  <div style={{ display:'flex', flexDirection: 'row', justifyContent:'center' }}>           
    
                  <div style={{alignSelf: 'center', fontSize: '24'}}> I want to call the API for the following stock ticker:</div> 
                  <TextField label="Stock Ticker" variant="outlined" value={ stockTicker } onChange={ev => setStockTicker(ev.target.value)} style={{display: 'flex', alignSelf: 'start', width: "20%", marginLeft:'1%', marginRight:'1%' }} /> 
                  </div>

                  <Button onClick={ tickerAPICall } disabled={ !stockTicker}>Get Ticker API Call!</Button>
                </form> 
                    
                </div>
              <div style={{display: 'flex'}}>
                <div style={{height:500,width:1200}}>
                    { data.length ? <MyResponsiveLine data={data}></MyResponsiveLine> : '' }  
                </div>
                <div>
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
                  </div>
                  </div>
            </div>
        
        )  : (
            <div>
                <h1>Can't Check Out Graphs If You're Not Logged In!</h1>
                <div>
                    <Link to={`/register`}>Register Here</Link> or <Link to='/login'> Login </Link>
                </div>
            </div>
          )
        } 
     
    </div>
  );
};

export default Graphs;

  