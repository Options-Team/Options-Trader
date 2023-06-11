import axios from 'axios';

const friends = (state = [], action)=> {
  if(action.type === 'SET_FRIENDS'){
    return action.friends;
  }
  if(action.type === 'CREATE_FRIEND'){
    return [...state, action.friend]
  }
  if(action.type === 'DESTROY_FRIEND'){
    return state.filter(friend => friend.id !== action.friendId)
  }
  if(action.type === 'UPDATE_FRIEND'){
    return state.map(friend => {
      if(friend.id === action.friend.id){
        return action.friend
      }
      return friend
    })
  }
  return state;
};

export const createFriend = (friend) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem('token');
        const response = await axios.post('/api/friends', friend, {
            headers: {
              authorization: token
            }
          })
        dispatch({type: 'CREATE_FRIEND', friend: response.data })
    }
}

export const updateFriend = (friend) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem('token');
        console.log(friend)
        const response = await axios.put(`/api/friends/${friend.id}`, friend, {
            headers: {
              authorization: token
            }
          })
        dispatch({type: 'UPDATE_FRIEND', friend: response.data })
    }
}

export const destroyFriend = (friendId) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem('token');
        const response = await axios.delete(`/api/friends/${friendId}`, {
            headers: {
              authorization: token
            }
          })
        dispatch({type: 'DESTROY_FRIEND', friendId})
    }
}

// export const destroyFriend = (friendId) => {
//     return async (dispatch) => {
//         const response = await axios.delete(`/api/friends/${friendId}`);
//         dispatch({type: 'DESTROY_FRIEND', friendId})
//     }
// }

 // export const destroyCampus = (campusId) => {
    //     return async(dispatch) => {
    //       const response = await axios.delete(`/api/campuses/${campusId}`);
    //       dispatch({type: 'DESTROY_CAMPUS', campusId})
    //     }
    //   }
      
    //   export const updateStudent = (student) => {
    //     return async(dispatch) => {
    //       const response = await axios.put(`/api/students/${student.id}`, student);
    //       dispatch({type: 'UPDATE_STUDENT', student: response.data})
    //     }
    //   }

export const fetchFriends = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
      const response = await axios.get('/api/friends', {
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'SET_FRIENDS', friends: response.data });
  };
};

export default friends;
