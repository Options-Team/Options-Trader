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

import Alert from '@mui/material/Alert';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const BuyStock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1);
  const [totalValue, setTotalValue] = useState(0);
  const [tradingFunds, setTradingFunds] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  
  const { ticker } = useParams();
  
  const { stocks, auth, portfolio } = useSelector(state => state);
  const stock = stocks.find(s => s.ticker === ticker);

  useEffect(() => {
    if(stock){
      setTotalValue(stock.currentPrice * quantity)
    }
    
  }, [stock, quantity]);

  // useEffect(() => {
  //   if(stock){
  //     setQuantity(totalValue / stock.currentPrice )
  //   }
    
  // }, [stock, totalValue]);

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
//     <form>

//       <Card sx={{ width: 300 }}>
//       <CardContent>
//         <Typography style={{display: 'flex', justifyContent: 'center'}} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//           { ticker }
//         </Typography>
//         <Typography variant="h5" component="div">
//           Current Price: { stock.currentPrice }
//         </Typography>
//         <div style={{ marginBottom: 8 }}/>
//         <TextField style={{ width: 200}} label='Shares' onChange={ ev => update(ev.target.value) } defaultValue={ quantity } type='number'></TextField>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Total Value: { totalValue.toFixed(2) }
//         </Typography>
//         <Typography variant="body2">
//           Available Funds: { auth.tradingFunds }
//         </Typography>
//       </CardContent>
//       <CardActions style={{display: 'flex', justifyContent: 'center'}}>
//         <Button disabled={ auth.tradingFunds < totalValue} onClick={ buy }>Buy { ticker }</Button>
//       </CardActions>
//     </Card>
//     { auth.tradingFunds < totalValue ?  <Alert severity="error">This is an error alert — check it out!</Alert> : null}
//     </form>

    <div>


      <div>
        <Button onClick={handleOpen}>Buy Modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="buy-stock"
          aria-describedby="buy-stock-description"
        >
          <Box sx={style}>
            {/* <Typography id="buy-stock-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="buy-stock-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            <form>
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
                <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                  <Button onClick={ buy }>Buy { ticker }</Button>
                </CardActions>
            </form>
          </Box>
        </Modal>
      </div>
    </div>

    
  );
};

export default BuyStock;







      <Alert severity="error">This is an error alert — check it out!</Alert>





    
