import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import { Link } from 'react-router-dom';

const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Home</h1>
        { auth.id ? <div> Welcome { auth.username }!!
        <button onClick={()=> dispatch(logout())}>Logout</button>
      </div> : <Link to='/login' style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Login</Link>}
      <div>
        <h1>Complete Your Risk Assessment to Being Trading Options!!</h1>
        <Link to={`/riskAssessment/${auth.id}`}>Click Here to Complete Risk Assessment</Link>
      </div>
    </div>
  );
};

export default Home;
