import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import assessments from './assessments';
import onlineUsers from './onlineUsers';
import messages from './messages';

const reducer = combineReducers({
  auth,
  onlineUsers,
  assessments,
  messages
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './assessments';
export * from './onlineUsers';
export * from './messages';
