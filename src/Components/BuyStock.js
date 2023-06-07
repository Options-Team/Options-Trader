import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { postTransaction } from '../store';
import portfolio, { fetchPortfolio } from '../store/portfolio';
import transaction from '../store/transactions';

const BuyStock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1);
  const [totalValue, setTotalValue] = useState(0);

  
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
  };

  const buy = () => {
    dispatch(postTransaction({quantity, stock, transactionMethod: 'Buy', userId: auth.id}));
    fetchPortfolio()
    navigate('/portfolio')
    //this hasn't been done yet or created, but should be in the store
  };

  return (
    <form>
      <label>Quantity:</label>
      <TextField onChange={ ev => update(ev.target.value) } defaultValue={ quantity } type='number'></TextField>
      <label>Current Price:</label>
      <div>{ stock.currentPrice }</div>
      <label>Available Cash:</label>
      <div>This comes from the user's info</div>
      <label>Total Value:</label>
      <div>{ totalValue.toFixed(2) }</div>
      <Button onClick={ buy }>Buy { ticker }</Button>
    </form>
  );
};

export default BuyStock;