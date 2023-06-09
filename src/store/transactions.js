import axios from 'axios';
import { fetchPortfolio } from './portfolio';

const transaction = (state =  [], action) => {
  if(action.type === 'SET_TRANSACTIONS'){
    return action.transactions
  }
  if(action.type === 'ADD_TRANSACTIONS'){
    return [...state, action.transaction];
  }
  return state;
};


export const postTransaction = (transaction) => {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const {userId} = transaction;
    const response = await axios.post(`/api/transactions/${userId}`, transaction, {
      headers: {
        authorization: token
      }
    });
    dispatch(fetchPortfolio())
    dispatch({ type: 'ADD_TRANSACTIONS', transaction: response.data });
    //call getPortfolio method
  };
};

export const fetchTransactions = () => {
  return async (dispatch)=> {
    const response = await axios.get('/api/transactions');
    dispatch({type: 'SET_TRANSACTIONS', transactions: response.data})
  }
}

export const buy = () => {};

export default transaction;