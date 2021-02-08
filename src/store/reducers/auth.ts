import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { RootAction } from 'store/actions';
import { login, logout, setSession } from 'store/actions/auth';
import { getType } from 'typesafe-actions';

type State = {
  username?: string;
  password?: string;
  sessionId?: string;
};

const initialState: State = {
  username: undefined,
  password: undefined,
  sessionId: undefined,
};

const reducer = (state = initialState, action: RootAction): State => {
  switch (action.type) {
    case getType(login):
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        sessionId: action.payload.sessionId,
      };
    case getType(setSession):
      return {
        ...state,
        sessionId: action.payload.sessionId,
      };
    case getType(logout):
      return {
        ...state,
        username: undefined,
        password: undefined,
        sessionId: undefined,
      };
    default:
      return state;
  }
};

export default persistReducer(
  {
    key: 'AUTH',
    storage,
  },
  reducer
);
