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



const Portfolio = ()=> {
  const { auth, portfolio, transactions } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let transactionData = []
  const [graph, setGraph] = useState('')

 
//accordion component
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const portfolioArr = Object.entries(portfolio)
//   console.log(portfolioArr)
let sum = 0

for(let i = 0; i < transactions.length; i++){
  let currTransaction = transactions[i]
  sum += currTransaction.transactionValue
  //console.log(currTransaction)
  transactionData.push(
      {
      "x": currTransaction.transactionDate.split('23-0')[1] + `.${i}`,
      "y": sum
    }
  )
}

const myPortfolioGraph = () => {
  // Update the graph state
  setGraph('show')
};

const getPortValue = () => {
  let total = 0
  // for(let stock of portfolio){
  //   total += stock.Current_Value
  // }

  for(let i = 0; i < transactions.length; i++){
    let currTransaction = transactions[i]
    total += currTransaction.transactionValue
    //console.log(currTransaction)
  }
  return total
}

const portfolioGraph = [
  {
    "id": `Your Portfolio`,
    "color": "hsl(55, 70%, 50%)",
    "data": transactionData
  },
]
//console.log(portfolioGraph)

  return (
    <div>
      {
        auth.id ? (
            <div>
                <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}> My Portfolio </h1>

                <div style={{float: 'right'}}>
         <Card sx={{ width: 400  }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }}  gutterBottom>
          Trading Juice: {auth.tradingFunds}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Trades Made: {transactions.length}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Money Invested: { getPortValue() }
        </Typography>
      </CardContent>
     
    </Card>   
 
      </div>

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
                            <Typography>
                              Priced At {stock[1]['Price']} per share
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                              {stock[1]['Current_Value']} invested
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div> 
                      )
                    })
                  } 
                <Button size="small" onClick={ ()=> myPortfolioGraph() }>My Performance</Button>
                {transactions.length && graph === 'show' ? <div style={{height:500,width:1000}}><MyResponsiveLine data={portfolioGraph}></MyResponsiveLine></div> : ''} 
            </div>
        
        )  : (
            <div>
                <h1>Can't Check Out Your Portfolio If You're Not Logged In!</h1>
                <div>
                    <Link to={`/register`}>Register Here</Link> or <Link to='/login'> Login </Link>
                </div>
            </div>
          )
        } 
     
    </div>
  );
};

export default Portfolio;





   
