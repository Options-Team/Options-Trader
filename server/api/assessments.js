const express = require('express');
const app = express.Router();
const { Assessment, User } = require('../db');

module.exports = app;

app.get('/', async(req, res, next)=> {
  try {
    res.send(await Assessment.findAll({
      include: [
        User
      ]
    })); 
  }
  catch(ex){
    next(ex);
  }
});

app.post('/create', async(req, res, next)=> {
  try {
    const assessment = await Assessment.create({score: req.body.score, userId: req.body.id});
    res.send(await Assessment.findByPk(assessment.id, {
      include: [
        User
      ]
    }));
  }
  catch(ex){
    next(ex);
  }
});
