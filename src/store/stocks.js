import axios from 'axios';

const stocks = (state = [], action)=> {
  if(action.type === 'SET_STOCKS'){
    return action.stocks;
  }
  return state;
};

export const fetchStocks = () => {
  return async(dispatch) => {
    const response = await axios.get('/api/stocks');
    dispatch({type: 'SET_STOCKS', stocks: response.data});
  }
};


export default stocks;