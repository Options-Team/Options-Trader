import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
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
import StarIcon from '@mui/icons-material/Star';
import transaction from '../store/transactions';

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
          legend: 'Funds Invested',
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



const Portfolio = ()=> {
  const { auth, portfolio, transactions, onlineUsers } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let transactionData = []
  const [graph, setGraph] = useState('')

  const myTransactions = transactions.filter(transaction => transaction.userId === auth.id)
 
//accordion component
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const portfolioArr = Object.entries(portfolio)
  //console.log(portfolioArr)
let sum = 0

for(let i = 0; i < myTransactions.length; i++){
  let currTransaction = myTransactions[i]
  sum += currTransaction.transactionValue
  transactionData.push(
      {
      "x": `#${i + 1} ` + currTransaction.createdAt.split('T')[0].split('23-')[1],
      "y": sum
    }
  )
}



// const myPortfolioGraph = () => {
//   // Update the graph state
//   setGraph('show')
// };

const getPortValue = () => {
  let total = 0

  for(let i = 0; i < myTransactions.length; i++){
    let currTransaction = myTransactions[i]
    total += currTransaction.transactionValue
  }
  return total.toFixed(2)
}

const getMoneyMoved = () => {
  let total = 0

  for(let i = 0; i < myTransactions.length; i++){
    let currTransaction = myTransactions[i]
    total += Math.abs(currTransaction.transactionValue)
  }
  return total.toFixed(2)
}

const getMostOwned = () => {
  let mostOwnedTotal = 0
  let mostOwned

  for(let i = 0; i < portfolioArr.length; i++){
    let currStock = portfolioArr[i]
    if(currStock[1]['Current_Value'] > mostOwnedTotal){
      mostOwnedTotal = currStock[1]['Current_Value']
      mostOwned = currStock[0]
    }
  }
  return mostOwned
}

const getDateJoined = () => {
  return auth.createdAt.split('T')[0]
}

const portfolioGraph = [
  {
    "id": `Portfolio`,
    "color": "hsl(55, 70%, 50%)",
    "data": transactionData
  },
]

  return (
    <div>
      {
        auth.id && myTransactions.length ? (
            <div>
                <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> My Portfolio </h1>

                <div style={{height:500,width:'100%'}}><MyResponsiveLine data={portfolioGraph}></MyResponsiveLine></div> 
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
        
                  <Card sx={{ height: 400, width: 300 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 16, display: 'flex', justifyContent: 'center' }}  gutterBottom>
                        {auth.username}
                        {myTransactions.length > 15 ? <StarIcon /> : null}
                      </Typography>
                      <Typography sx={{ fontSize: 16 }}  gutterBottom>
                        Trading Juice: ${auth.tradingFunds.toFixed(2)}
                      </Typography>
                      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Trades Made: {myTransactions.length}
                      </Typography>
                      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Current Invested: { getPortValue() }
                      </Typography>
                      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Money Moved: { getMoneyMoved() }
                      </Typography>
                      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Most Owned Stock: { getMostOwned() }
                      </Typography>
                      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Trading Since: { getDateJoined() }
                      </Typography>
                    </CardContent>
                  
                  </Card>   
 
      
                <div>
                  { portfolioArr.map((stock, idx) => {
                      return (
                      <div key={idx} style={{ width: 500}}>
                      <Accordion key={idx} expanded={expanded === `panel${idx}`} onChange={handleChange(`panel${idx}`)}>
                          <AccordionSummary aria-controls={`panel${idx}-content`} id={`panel${idx}-header`}>
                            <Typography>{stock[1]['Shares']} Shares of  {stock[1]['Ticker']}</Typography>
                          </AccordionSummary>

                          <AccordionDetails>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              {stock[1]['Stock']} 
                            </Typography>
                            <Typography component='a' href={`/#/stocks/${stock[1]['Ticker']}`} variant="body2" color="text.secondary">
                              {stock[1]['Ticker']}
                            </Typography>
                            <Typography>
                              Priced At {stock[1]['Price']} per share
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                              {stock[1]['Current_Value'].toFixed(2)} invested
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div> 

                      )
                    })
                  } 
                </div>
                <Card sx={{ width: 300  }}>
                  <CardContent>
                  <Typography component='a' href={`/#/chats`} variant="body2" color="text.secondary">
                      Online Users ({onlineUsers.length}):
                    </Typography>
                    <ul>
                          {onlineUsers.map(user => {
                            return(
                              <li key={user.id} style={{ display: 'flex', alignItems: 'center'}}>
                                {user.username}                   
                              </li>
                            )
                          })}
                        </ul>
                  </CardContent>
                </Card>   

                <img style={{height: 400, width:'auto', float: 'right'}} src='static/upanddownman.jpeg'></img>
                  </div>
            </div>        
        )  : (
            <div >
                <h2 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Can't See Waht's Not There!</h2>
                <h3 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Login, Register, or Make a Trade to fill your portfolio</h3>
                <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <Button sx={{width: 100}} onClick={()=> navigate('/register')}>Register</Button>
                
                <Button sx={{width: 100}} onClick={()=> navigate('/login')}>Login</Button>
                    {/* <Link to={`/register`}>Register Here</Link> or <Link to='/login'> Login </Link> */}
                </div>
            </div>
          )
        } 
     
    </div>
  );
};

export default Portfolio;





   
