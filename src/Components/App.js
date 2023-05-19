import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Account from './Account';
import Register from './Register';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../store';
import { Link, Routes, Route } from 'react-router-dom';


const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <h1>FS App Template</h1>
      {/* {
        auth.id ? <Home /> : <Login />
      } */}
          <div>
            <nav>
              <Link to='/'>Home</Link>
              <Link to='/account'>Account</Link>
            </nav>
            <Routes>
              <Route path='/login' element={ <Login /> } />
              <Route path='/' element={ <Home /> } />
              <Route path='/home' element={ <Home /> } />
              <Route path='/account' element={ <Account /> } />
              <Route path='/register' element={ <Register /> } />
            </Routes>
          </div>
        
      
    </div>
  );
};

export default App;
