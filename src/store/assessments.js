import axios from 'axios';

const assessments = (state = [], action)=> {
  if(action.type === 'SET_ASSESSMENTS'){
    return action.assessments;
  }
  if(action.type === 'CREATE_ASSESSMENT'){
    return [...state, action.assessment];
  }
  return state;
};

export const fetchAssessments = () => {
  return async(dispatch) => {
    const response = await axios.get('/api/assessments');
    dispatch({type: 'SET_ASSESSMENTS', assessments: response.data});
  }
};

export const submitAssessment = (id, score) => {
  const params = {id, score};
  return async(dispatch) => {
    const response = await axios.post(`/api/assessments/create`, params)
    dispatch({type: 'CREATE_ASSESSMENT', assessment: response.data});
  };
};

export default assessments;
