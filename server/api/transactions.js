const express = require('express');
const app = express.Router();
const { User } = require('../db');
const { isLoggedIn } = require('./middleware.js');




// app.post('/', isLoggedIn, async (req, res, next)=> {
//   try {
//     res.send(await req.user.createOrder());
//   }
//   catch(ex){
//     next(ex);
//   }
// });

app.get('/portfolio', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.getPortfolio());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/portfolio', isLoggedIn, async(req, res, next)=> {
  try {
    console.log(req.user, req.body)
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