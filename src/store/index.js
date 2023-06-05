import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import assessments from './assessments';
import onlineUsers from './onlineUsers';
import users from './users';
import messages from './messages';
import portfolio from './portfolio';
import stocks from './stocks';

const reducer = combineReducers({
  auth,
  onlineUsers,
  users,
  assessments,
  messages,
  portfolio,
  stocks
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './assessments';
export * from './onlineUsers';
export * from './messages';
export * from './portfolio';
export * from './stocks';
export * from './users';
