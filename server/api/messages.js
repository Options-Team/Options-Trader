const express = require('express');
const app = express.Router();
const { Message } = require('../db');

module.exports = app;


app.post('/create', async(req, res, next)=> {
  try {
    console.log(req.body)
    const message = await Message.create(req.body);
    console.log(message);
    res.send(message);
  }
  catch(ex){
    next(ex);
  }
});
