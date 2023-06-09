const express = require('express');
const app = express.Router();
const { Message } = require('../db');
const { isLoggedIn } = require('./middleware');




app.post('/create', async(req, res, next)=> {
  try {
    const message = await Message.create(req.body);
    res.send(message);
  }
  catch(ex){
    next(ex);
  }
});

app.post('/', isLoggedIn , async(req, res, next)=> {
    try {
      res.send(await req.user.sendMessage(req.body));
    }
    catch(ex){
      next(ex);
    }
  });
  
  module.exports = app;