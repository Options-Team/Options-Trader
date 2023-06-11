import React, { useEffect, useRef } from 'react';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Account from './Account';
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
    dispatch(fetchPortfolio())
    dispatch(fetchTransactions())
    //dispatch(fetchOnlineUsers());
  }, []);

  useEffect(()=>{
    if(!prevAuth.current.id && auth.id){
      //check messages
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
      {/* <h1 style={{ display: 'flex', justifyContent: 'center'}}>Your Best Option Trader</h1> */}
      {/* {
        auth.id ? <Home /> : <Login />
      } */}
      
          <div>
            <NavBar />
            {/* <nav>
              <Link to='/'>Home</Link>
              <Link to='/account'>Account</Link>
              <Link to='/stocks'>Stocks</Link>
              <Link to='/graphs'>Graphs</Link>
              <Link to='/chats'>Chats</Link>
            </nav> */}
            <Routes>
              <Route path='/login' element={ <Login /> } />
              <Route path='/logout' element={ <Logout /> } />
              <Route path='/' element={ <Home /> } />
              <Route path='/home' element={ <Home /> } />
              <Route path='/account' element={ <Account /> } />
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
            </Routes>
          </div>
          {/* {
        !!auth.id && (
          <div>
            <h1>Online Users ({onlineUsers.length})</h1>
            <ul>
              {onlineUsers.map(user => {
                return(
                  <li key={user.id}>
                    {user.username}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      }

{
        !!auth.id && (
          <div>
            <h1>Messages ({messages.length})</h1>
            <ul>
              {messages.filter(message => {
                return message.toId === auth.id
              })
              .map(_message => {
                return(
                  <li key={_message.id}>
                    From: {_message.from.username}
                    <br />
                    Message:{_message.txt}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      } */}
      
    </div>
  );
};

export default App;
