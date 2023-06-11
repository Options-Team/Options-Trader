const { default: axios } = require('axios');
const express = require('express');
const app = express.Router();
const { User, Transaction, Stock } = require('../db');
const { isLoggedIn } = require('./middleware.js');




// app.post('/', isLoggedIn, async (req, res, next)=> {
//   try {
//     res.send(await req.user.createOrder());
//   }
//   catch(ex){
//     next(ex);
//   }
// });

app.get('/portfolio',isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.getPortfolio())
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', async(req, res, next)=> {
  try {
    res.send(await Transaction.findAll({
      include: [
        User,
        Stock
      ]
    }));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/:id', isLoggedIn, async(req, res, next)=> {
  try {
    console.log('here'); 
    const user = req.user
    if(req.body.transactionMethod === 'Buy'){
      if(user.tradingFunds - (req.body.stock.currentPrice * req.body.quantity) < 0) {
        throw new Error('Not enough juice, sorry!')
    }
    } else {
      console.log(req.body)
    //   if(user.tradingFunds - (req.body.stock.currentPrice * req.body.quantity) < 0) {
    //     throw new Error('Not enough shares, sorry!')
    // }
    }
    
    const transaction = await Transaction.create({purchasePrice: req.body.stock.currentPrice, shares: req.body.quantity, transactionDate: '2023-06-06', transactionMethod: req.body.transactionMethod, stockId: req.body.stock.id, userId: req.body.userId});
    //req.user.tradingFunds - (req.body.stock.currentPrice * req.body.quantity)
   
    // user.tradingFunds -= (req.body.stock.currentPrice * req.body.quantity)
    // await user.save() TWO DIFFERENT WAYS TO UPDATE

    if(req.body.transactionMethod === 'Buy'){
      await user.update({ tradingFunds:  user.tradingFunds - (req.body.stock.currentPrice * req.body.quantity)})
    } else if(req.body.transactionMethod === 'Sell') {
      await user.update({ tradingFunds:  user.tradingFunds - (req.body.stock.currentPrice * req.body.quantity)})
    }
    
    //console.log(transaction);
    res.send(transaction);
  }
  catch(ex){
    next(ex);
  }
});

app.post('/portfolio', isLoggedIn, async(req, res, next)=> {
  try {
    // console.log(req.user, req.body)
    res.send(await req.user.addToPortfolio(req.body));
  }
  catch(ex){
    next(ex);
  }
});



app.put('/portfolio', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.removeFromPortfolio(req.body));
  }
  catch(ex){
    next(ex);
  }
});


module.exports = app;