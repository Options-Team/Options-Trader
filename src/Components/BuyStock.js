import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginWithToken, postTransaction, updateAuth } from '../store';
import portfolio, { fetchPortfolio } from '../store/portfolio';
import transaction from '../store/transactions';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const BuyStock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1);
  const [totalValue, setTotalValue] = useState(0);
  const [tradingFunds, setTradingFunds] = useState('')
  
  const { ticker } = useParams();
  
  const { stocks, auth, portfolio } = useSelector(state => state);
  const stock = stocks.find(s => s.ticker === ticker);

  useEffect(() => {
    if(stock){
      setTotalValue(stock.currentPrice * quantity)
    }
    
  }, [stock, quantity]);

  // useEffect(() => {
  //   if(portfolio){
  //     fetchPortfolio()
  //   }
  // }, [transaction])

  if(!stock){
    return null;
  }

  const update = (updatedQuantity) => {
    setQuantity(+updatedQuantity);
    setTotalValue(updatedQuantity * stock.currentPrice);
    //setTradingFunds(auth.tradingFunds - (updatedQuantity * stock.currentPrice))
  };

  const buy =  async () => {
    await dispatch(postTransaction({quantity, stock, transactionMethod: 'Buy', userId: auth.id}));
    await dispatch(loginWithToken())
    await dispatch(fetchPortfolio())
    navigate('/portfolio')
    
  };



   
  

  return (
    // <form>
    //   <label>Quantity:</label>
    //   <TextField onChange={ ev => update(ev.target.value) } defaultValue={ quantity } type='number'></TextField>
    //   <label>Current Price:</label>
    //   <div>{ stock.currentPrice }</div>
    //   <label>Available Cash:</label>
    //   <div>This comes from the user's info</div>
    //   <label>Total Value:</label>
    //   <div>{ totalValue.toFixed(2) }</div>
    //   <Button onClick={ buy }>Buy { ticker }</Button>
    // </form>
    <form>

      <Card sx={{ width: 300 }}>
      <CardContent>
        <Typography style={{display: 'flex', justifyContent: 'center'}} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          { ticker }
        </Typography>
        <Typography variant="h5" component="div">
          Current Price: { stock.currentPrice }
        </Typography>
        <div style={{ marginBottom: 8 }}/>
        <TextField style={{ width: 200}} label='Shares' onChange={ ev => update(ev.target.value) } defaultValue={ quantity } type='number'></TextField>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Total Value: { totalValue.toFixed(2) }
        </Typography>
        <Typography variant="body2">
          Available Funds: { auth.tradingFunds }
        </Typography>
      </CardContent>
      <CardActions style={{display: 'flex', justifyContent: 'center'}}>
        <Button onClick={ buy }>Buy { ticker }</Button>
      </CardActions>
    </Card>
    </form>
  );
};

export default BuyStock;








    
