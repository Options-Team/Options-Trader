import React, { useEffect, useRef } from 'react';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Account from './Account';
import Profile from './Profile';
import Employment from './Employment';
import Register from './Register';
import Stocks from './Stocks';
import Launch from './Launch'
import Graphs from './Graphs'
import Financials from './Financials';
import Finalize from './Finalize';
import RiskAssessment from './RiskAssessment';
import BuyStock from './BuyStock';
import Chats from './Chats';
import NavBar from './NavBar';
import Portfolio from './Portfolio';
import Deposit from './Deposit';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchAssessments, fetchOnlineUsers, fetchMessages, fetchStocks, fetchUsers,fetchPortfolio, fetchTransactions, fetchFriends, fetchHypes } from '../store';
import { Link, Routes, Route } from 'react-router-dom';



const App = ()=> {
  const { auth, onlineUsers, messages, users, friends } = useSelector(state => state);
  const dispatch = useDispatch();
  const prevAuth = useRef(auth);

  useEffect(()=> {
    dispatch(loginWithToken());
    dispatch(fetchAssessments());
    dispatch(fetchStocks());
    dispatch(fetchUsers());
    dispatch(fetchTransactions())
  }, []);
  
  useEffect(()=>{
    if(!prevAuth.current.id && auth.id){
      //check messages
      dispatch(fetchPortfolio())
      dispatch(fetchMessages())
      dispatch(fetchFriends())
      dispatch(fetchHypes())
      console.log('you just logged in');
      window.socket = new WebSocket(window.location.origin.replace('http', 'ws'));
      window.socket.addEventListener('open', () => {
        window.socket.send(JSON.stringify({ token: window.localStorage.getItem('token')}))
      })
      window.socket.addEventListener('message', (ev) => {
        const message = JSON.parse(ev.data)
        if(message.type){
          dispatch(message)
        }
        console.log(message)
      })
      dispatch(fetchOnlineUsers());
    }
    if(prevAuth.current.id && !auth.id){
      console.log('you just logged out')
      window.socket.close()
    }
  }, [auth])

  useEffect(()=>{
    prevAuth.current = auth
  })

  return (
    <div>
      
          <div>
            <NavBar sx={{ bgcolor: "green" }}/>
           
            <Routes>
              <Route path='/login' element={ <Login /> } />
              <Route path='/logout' element={ <Logout /> } />
              <Route path='/' element={ <Home /> } />
              <Route path='/home' element={ <Home /> } />
              <Route path='/account' element={ <Profile /> } />
              <Route path='/accountSetup' element={ <Account /> } />
              <Route path='/employment' element={ <Employment /> } />
              <Route path='/register' element={ <Register /> } />
              <Route path='/stocks' element={ <Stocks /> } />
              <Route path='/financials' element={ <Financials />} />
              <Route path='/finalize' element={ <Finalize />} />
              <Route path='/launch' element={ <Launch />} />
              <Route path='/stocks/:stockTicker' element={ <Graphs />} />
              <Route path='/buy/:ticker' element={ <BuyStock />} />
             
              <Route path='/riskAssessment/:id' element={ <RiskAssessment />} />
              <Route path='/chats' element={ <Chats />} />
              <Route path='/portfolio' element={ <Portfolio />} />
              <Route path='/deposit' element={ <Deposit />} />
            </Routes>
          </div>
      
    </div>
  );
};

export default App;
