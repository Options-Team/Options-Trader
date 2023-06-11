import axios from 'axios';

const portfolio = (state = [], action)=> {
  if(action.type === 'SET_PORTFOLIO'){
    return action.portfolio;
  }
  return state;
};


export const fetchPortfolio = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/transactions/portfolio', {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'SET_PORTFOLIO', portfolio: response.data });
  };
};

export const addToPortfolio = (product, quantity) => {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.post('/api/transactions/portfolio',{
      stock,
      shares
    }, {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'SET_PORTFOLIO', portfolio: response.data });
  }
}

export const removeFromPortfolio = (stock, sharesToRemove) => {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.put('/api/transactions/portfolio',{
      stock,
      sharesToRemove
    }, {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'SET_PORTFOLIO', portfolio: response.data });
  }
}




export default portfolio;