import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import auth from './auth';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth,
  });

export default createRootReducer;

export type RootState = StateType<ReturnType<typeof createRootReducer>>;
