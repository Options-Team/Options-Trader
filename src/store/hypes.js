import axios from 'axios';

const hypes = (state = [], action)=> {
  if(action.type === 'SET_HYPES'){
    return action.hypes;
  }
  if(action.type === 'CREATE_HYPE'){
    return [...state, action.hype]
  }
  return state;
};


export const createHype = (hype) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem('token');
        const response = await axios.post('/api/hypes', hype, {
            headers: {
              authorization: token
            }
          })
        dispatch({type: 'CREATE_HYPE', hype: response.data })
    }
}

export const fetchHypes = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
      const response = await axios.get('/api/hypes', {
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'SET_HYPES', hypes: response.data });
  };
};

export default hypes;

