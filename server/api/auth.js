const express = require('express');
const app = express.Router();
const { User, Friend, Hype } = require('../db');
const { isLoggedIn } = require('./middleware');

module.exports = app;

app.post('/', async(req, res, next)=> {
  try {
    res.send(await User.authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/register', async(req, res, next)=> {
  try {
    const user = await User.create(req.body);
    res.send(user.generateToken());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/loginGoogle', async(req, res, next)=> {
  try {
    // const user = await User.create(req.body);
    // console.log(req.body);
    res.send(await User.authenticateGoogle(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', isLoggedIn, (req, res, next)=> {
  try {
    res.send(req.user); 
  }
  catch(ex){
    next(ex);
  }
});

app.put('/', isLoggedIn, async(req, res, next)=> {
  try {
    const user = req.user;
    //define the properties a user can change
    await user.update(req.body);
    res.send(user);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/users',  async (req, res, next)=> {
  try {
      res.send( await User.findAll())
  } catch (error) {
      next(error)
  }
})

app.get('/friends',  async (req, res, next)=> {
  try {
      res.send( await Friend.findAll())
  } catch (error) {
      next(error)
  }
})

app.get('/hypes',  async (req, res, next)=> {
  try {
      res.send( await Hype.findAll())
  } catch (error) {
      next(error)
  }
})