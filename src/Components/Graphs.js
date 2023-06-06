import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { POLYGON_API_KEY, X_RapidAPI_Key } from '../../secrets';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {ResponsiveLine} from '@nivo/line';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


const MyResponsiveLine = ({data}) => (
  <ResponsiveLine
      data={data}
      margin={{ top: 25, right: 100, bottom: 50, left: 60 }}
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
  const [data2Week, setData2Week] = useState([])
  const [data5Day, setData5Day] = useState([])
  const [currentTicker, setCurrentTicker] = useState('')
  const [logo, setLogo] = useState('')
  const [outlook, setOutlook] = useState([])
  const [innovationPerformance, setInnovationPerformance] = useState('')
  const [innovationScore, setInnovationScore] = useState(0)
  const [innovationTrend, setInnovationTrend] = useState('')
  const [top25Ticker, setTop25Ticker] = useState([])


  // UNCOMMENT TO ADD TICKER EVERY TIME SOMEONE GOES TO THE GRAPHS PAGE
  // useEffect(()=> {
  //   getTop25Trending()
  // },[])
 
const weekDates = ['2023-05-26', '2023-05-25', '2023-05-24','2023-05-23', '2023-05-22', '2023-05-19', '2023-05-18', '2023-05-17','2023-05-16', '2023-05-15', '2023-05-12', '2023-05-11', '2023-05-10', '2023-05-09', '2023-05-08', '2023-05-05', '2023-05-04', '2023-05-03', '2023-05-02', '2023-05-01','2023-04-28','2023-04-27','2023-04-26','2023-04-25','2023-04-24','2023-04-21','2023-04-20','2023-04-19','2023-04-18','2023-04-17','2023-04-14','2023-04-13','2023-04-12','2023-04-11','2023-04-10','2023-04-06','2023-04-05','2023-04-04','2023-04-03']

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
        let lastTwoWeeksArrayForGraph = []
        let last5daysArrayForGraph = []
        const tickerResponse = await axios.request(options)
        console.log(tickerResponse.data)
        let times = Object.keys(tickerResponse.data["Time Series (Daily)"]).reverse()

        for(let i = times.length - 30; i < times.length; i++){
          lastMonthArrayForGraph.push(
              {
              "x": times[i].split('23-0')[1],
              "y": tickerResponse.data['Time Series (Daily)'][`${times[i]}`]['4. close']
          }
          )
        }

        for(let i = times.length - 14; i < times.length; i++){
          
          lastTwoWeeksArrayForGraph.push(
              {
              "x": times[i].split('23-0')[1],
              "y": tickerResponse.data['Time Series (Daily)'][`${times[i]}`]['4. close']
          }
          )
        }

        for(let i = times.length - 5; i < times.length; i++){
          console.log(times[i])
          last5daysArrayForGraph.push(
              {
              "x": times[i].split('23-0')[1],
              "y": tickerResponse.data['Time Series (Daily)'][`${times[i]}`]['1. open']
          }
          )
          last5daysArrayForGraph.push(
            {
            "x": times[i].split('23-0')[1] + ' 12:00',
            "y": tickerResponse.data['Time Series (Daily)'][`${times[i]}`]['4. close']
            }
          )
        }


        const dataForGraph = [
            {
              "id": `${stockTicker ? stockTicker : ''}`,
              "color": "hsl(55, 70%, 50%)",
              "data": lastMonthArrayForGraph
            },
          ]

          const dataForTwoWeekGraph = [
            {
              "id": `${stockTicker ? stockTicker : ''}`,
              "color": "hsl(55, 70%, 50%)",
              "data": lastTwoWeeksArrayForGraph
            },
          ]

          const dataFor5DayGraph = [
            {
              "id": `${stockTicker ? stockTicker : ''}`,
              "color": "hsl(55, 70%, 50%)",
              "data": last5daysArrayForGraph
            },
          ]

            setData(dataForGraph)
            setData2Week(dataForTwoWeekGraph)
            setData5Day(dataFor5DayGraph)

            const tickerInfoResponse = await axios.get(`https://api.polygon.io/v3/reference/tickers/${stockTicker}?apiKey=${POLYGON_API_KEY}`)
            setCurrentTicker(tickerInfoResponse.data.results)
            setLogo(tickerInfoResponse.data.results.branding.icon_url)

            } catch (error) {
              console.log(error)
          }
        }
        

        const tickerOutlookAPICall = async (ev) => {
          ev.preventDefault();
          const outlookOptions = {
            method: 'GET',
            url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-company-outlook',
            params: {
              symbol: `${stockTicker}`,
              region: 'US',
              lang: 'en-US'
            },
            headers: {
              'X-RapidAPI-Key': `${X_RapidAPI_Key}`,
              'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
          };
          
          try {
            const tickerOutlookResponse = await axios.request(outlookOptions);
            
            setOutlook(tickerOutlookResponse.data.finance.result.significantDevelopments)
            setInnovationPerformance(tickerOutlookResponse.data.finance.result.companyOutlookSummary.innovationPerformance)
            setInnovationScore(tickerOutlookResponse.data.finance.result.companyOutlookSummary.innovationScore)
            setInnovationTrend(tickerOutlookResponse.data.finance.result.companyOutlookSummary.innovationTrend)

          } catch (error) {
            console.error(error);
          }
        }

//accordion component
  const [expanded, setExpanded] = React.useState('panel0');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  //Graph Components
  const [classList5Day, setClassList5Day] = useState('hidden');
  const [classList2Week, setClassList2Week] = useState('hidden');
  const [classList1Month, setClassList1Month] = useState('hidden');


  const fiveDayClick = () => {
    
    // Update the classlist state
    console.log(data5Day)
    setClassList5Day('');
    setClassList2Week('hidden')
    setClassList1Month('hidden')
    console.log(classList1Month, classList2Week, classList5Day)
  };

  const twoWeekClick = () => {
  
    // Update the classlist state
    console.log(data2Week)
    setClassList5Day('hidden');
    setClassList2Week('')
    setClassList1Month('hidden')
    console.log(classList1Month, classList2Week, classList5Day)
  };

  const oneMonthClick = () => {
    // Update the classlist state
    console.log(data)
    setClassList5Day('hidden');
    setClassList2Week('hidden')
    setClassList1Month('')
    console.log(classList1Month, classList2Week, classList5Day)
  };

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


    // <div className={classList}>
    //   <button onClick={handleButtonClick}>Change Class</button>
    //   {/* Rest of your JSX */}
    // </div>
  
  const buy = () => {
    navigate(`/buy/${stockTicker}`);
  };

  return (
    <div>
      {
        auth.id ? (
            <div>
                <div className='ticker-tape' style={{padding: 'none', margin: 'none', height: 100}}>
                    <div className='ticker'>
                        { top25Ticker ? top25Ticker.map((ticker, idx) => {
                            return (
                                <div className='ticker__item' key={idx}>{ticker.symbol}: {ticker.regularMarketPrice}</div>
                            )
                        }) : ''}
                    </div>
                </div>
                {/* <Button onClick={ getTop25Trending } >Fill The Ticker!</Button> */}
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

                <div>
                  <Button onClick={ () => buy() }>BUY!</Button>
                </div>

                </div>
              <div style={{display: 'flex'}}>
                <div style={{height:800,width:1200}}>
                <Button size="small" onClick={ ()=> fiveDayClick() }>5-day</Button> 
                <Button size="small" onClick={ ()=> twoWeekClick() }>2-week</Button>
                <Button size="small" onClick={ ()=> oneMonthClick() }>1-month</Button>
                    { data.length ? <MyResponsiveLine data={data}></MyResponsiveLine> : '' }

                </div>

                  <div className={classList5Day} id='five-day-graph'>
                    <MyResponsiveLine className={classList5Day} data={data5Day}></MyResponsiveLine>
                  </div>

                  <div className={classList2Week} id='two-week-graph'>
                    <MyResponsiveLine data={data2Week}></MyResponsiveLine>
                  </div>  

                  <div className={classList1Month} id='one-month-graph'>
                    <MyResponsiveLine data={data}></MyResponsiveLine>
                  </div>  

                <div>
                {currentTicker ? <Card sx={{ maxWidth: 345 }}>
                
                    <img style={{width: 345}} src={`${logo}?apiKey=${POLYGON_API_KEY}`} />   
                
                      <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {currentTicker.name}
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary">
                            {currentTicker.description}
                          </Typography>
                      </CardContent>

                    <CardActions>
                        <Button size="small" onClick={ tickerOutlookAPICall }>Get Outlook</Button>
                    </CardActions>
                    </Card> : ''} 
                  </div>
                  
                  </div>
                  <div>
                    {outlook.length ?  <Card style={{ width: 1200 }}>
                                  <CardContent>
                                    <Typography variant="h5" component="div">
                                      Currently {innovationTrend}
                                    </Typography>

                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                      Score: {innovationScore}
                                    </Typography>

                                    <Typography variant="body2">
                                      {stockTicker} is {innovationPerformance}
                                    
                                    </Typography>
                                  </CardContent>
                                
                                </Card> 
                                
                                : ''}
                  </div>
                  { outlook.map((story, idx) => {
                      return (
                      <div key={idx} style={{ width: 1200}}>
                      <Accordion key={idx} expanded={expanded === `panel${idx}`} onChange={handleChange(`panel${idx}`)}>
                          <AccordionSummary aria-controls={`panel${idx}-content`} id={`panel${idx}-header`}>
                            <Typography>Trending Story #{idx + 1}</Typography>
                          </AccordionSummary>

                          <AccordionDetails>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              {story.date}
                            </Typography>
                            <Typography>
                              {story.headline}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div> 
                      )
                    })
                  } 
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






         // for(let i = 0; i <= weekDates.length - 1; i++){
        //     lastMonthArrayForGraph.push(
        //         {
        //         "x": weekDates[weekDates.length - 1 - i].split('23-0')[1],
        //         "y": tickerResponse.data['Time Series (Daily)'][`${weekDates[weekDates.length - 1 - i]}`]['4. close']
        //     }
        //     )
        // }

    
      
//const dat = [
//     {
//       "id": "AAPL",
//       "color": "hsl(55, 70%, 50%)",
//       "data": [
//         {
//           "x": "May 09",
//           "y": 171.77
//         },
//         {
//           "x": "May 10",
//           "y": 173.56
//         },
//         {
//           "x": "May 11",
//           "y": 173.75
//         },
//         {
//           "x": "May 12",
//           "y": 172.57
//         },
//         {
//           "x": "May 15",
//           "y": 172.07
//         },
//         {
//           "x": "May 16",
//           "y": 172.07
//         },
//         {
//           "x": "May 17",
//           "y": 172.69
//         },
//         {
//           "x": "May 18",
//           "y": 175.05
//         },
//         {
//           "x": "May 19",
//           "y": 175.96
//         },
//         {
//           "x": "May 22",
//           "y": 174.20
//         },
//         {
//           "x": "May 23",
//           "y": 171.56
//         },
//         {
//           "x": "May 24",
//           "y": 171.30
//         }
//       ]
//     },
//   ]



   
