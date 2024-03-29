import axios from 'axios';
const auth = (state = { }, action)=> {
  if(action.type === 'SET_AUTH'){
    return action.auth;
  }
  return state;
};

export const logout = ()=> {
  window.localStorage.removeItem('token');
  return { type: 'SET_AUTH', auth: {} };
};


export const loginWithToken = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      try{
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'SET_AUTH', auth: response.data });
      }
      catch(error){
        if(error.response && error.response.status === 401){
          window.localStorage.removeItem('token')
        }
      }
    }
  };
};


export const attemptLogin = (credentials)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/auth', credentials);
    window.localStorage.setItem('token', response.data);
    dispatch(loginWithToken());
  };
};

export const attemptSignup = (credentials)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/auth/signup', credentials);
    window.localStorage.setItem('token', response.data);
    dispatch(loginWithToken());
  };
};

export const register = (credentials)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/auth/register', credentials);
    window.localStorage.setItem('token', response.data);
   dispatch(loginWithToken()); 
  };
};

export const updateAuth = (auth)=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.put('/api/auth', auth, {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'SET_AUTH', auth: response.data });
  };
};

export const googleOAuthLogin = (credentials) =>{
  return async(dispatch) =>{
    const response = await axios.post('/api/auth/loginGoogle',credentials);
    // const token = response.data.token;
    // console.log(token);
    console.log(response.data);
    window.localStorage.setItem('token',response.data);
    dispatch(loginWithToken());
  }
}

export default auth;
