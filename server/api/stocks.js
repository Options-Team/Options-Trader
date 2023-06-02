const express = require('express');
const app = express.Router();
const { Stock, User } = require('../db');

module.exports = app;

app.get('/', async(req, res, next)=> {
  try {
    res.send(await Stock.findAll()); 
  }
  catch(ex){
    next(ex);
  }
});
