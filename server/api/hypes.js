const express = require('express');
const app = express.Router();
const { Hype } = require('../db');
const { isLoggedIn } = require('./middleware');


app.post('/', isLoggedIn , async(req, res, next)=> {
    try {
      res.send(await req.user.sendHype(req.body));
    }
    catch(ex){
      next(ex);
    }
  });
  
  module.exports = app;