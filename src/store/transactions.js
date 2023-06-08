import axios from 'axios';

const transaction = (state =  [], action) => {
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
    dispatch({ type: 'ADD_TRANSACTIONS', transaction: response.data });
    //call getPortfolio method
  };
};

export const buy = () => {};

export default transaction;