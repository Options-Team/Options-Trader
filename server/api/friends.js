const express = require('express');
const app = express.Router();
const { Friend, User } = require('../db');
const { isLoggedIn } = require('./middleware');


app.put('/:id', isLoggedIn, async(req, res, next) => {
    try {
        const friend = await Friend.findByPk(req.params.id)
        await friend.update(req.body)
        res.send(await Friend.findByPk(friend.id, { 
            include: [
            {
              model: User, as: 'from',
              attributes: ['username', 'id']
            },
            {
              model: User, as: 'to',
              attributes: ['username', 'id']
            }
          ]
        }))
    } catch (error) {
        next(error)
    }
})

app.delete('/:id', isLoggedIn, async(req, res, next) => {
    try {
        const friend = await Friend.findByPk(req.params.id)
        await friend.destroy();
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

app.post('/', isLoggedIn , async(req, res, next)=> {
    try {
      res.send(await req.user.sendFriendRequest(req.body));
    }
    catch(ex){
      next(ex);
    }
  });

  

  
  module.exports = app;