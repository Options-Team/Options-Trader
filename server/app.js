const express = require('express');
const app = express();
const path = require('path');
app.use(express.json({limit: '50mb'}));
const socketMap = require('./socketMap')
const { isLoggedIn } = require('./api/middleware');
const { User } = require('./db');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/index.html')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/datepicker-css')));

app.use('/api/auth', require('./api/auth'));
app.use('/api/assessments', require('./api/assessments'));
app.use('/api/messages', require('./api/messages'));
app.use('/api/stocks', require('./api/stocks'));

app.get('/api/messages', isLoggedIn, async(req, res,next)=> {
    try {
      res.send(await req.user.messagesForUser());
    }
    catch(ex){
      next(ex);
    }
});

app.get('/api/onlineUsers', (req, res, next)=> {
    try {
        res.send(Object.values(socketMap).map(value => {
            return { id: value.user.id, username: value.user.username }
        }))
    } catch (error) {
        next(error)
    }
})

app.get('/api/users',  async (req, res, next)=> {
    try {
        res.send( await User.findAll())
    } catch (error) {
        next(error)
    }
})

module.exports = app;
