import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Account from './Account';
import Employment from './Employment';
import Register from './Register';
import Stocks from './Stocks';
import Launch from './Launch'
import Graphs from './Graphs'
import Financials from './Financials';
import Finalize from './Finalize';
import RiskAssessment from './RiskAssessment';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchAssessments } from '../store';
import { Link, Routes, Route } from 'react-router-dom';



const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
    dispatch(fetchAssessments());
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
              <Link to='/stocks'>Stocks</Link>
              <Link to='/graphs'>Graphs</Link>
            </nav>
            <Routes>
              <Route path='/login' element={ <Login /> } />
              <Route path='/' element={ <Home /> } />
              <Route path='/home' element={ <Home /> } />
              <Route path='/account' element={ <Account /> } />
              <Route path='/employment' element={ <Employment /> } />
              <Route path='/register' element={ <Register /> } />
              <Route path='/stocks' element={ <Stocks /> } />
              <Route path='/financials' element={ <Financials />} />
              <Route path='/finalize' element={ <Finalize />} />
              <Route path='/launch' element={ <Launch />} />
              <Route path='/graphs' element={ <Graphs />} />
              <Route path='/riskAssessment/:id' element={ <RiskAssessment />} />

            </Routes>
          </div>
        
      
    </div>
  );
};

export default App;
