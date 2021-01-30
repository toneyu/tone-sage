import { RootState } from 'store/reducers';

export const sessionIdSelector = (state: RootState) => state.auth.sessionId;

export const usernameSelector = (state: RootState) => state.auth.username;

export const passwordSelector = (state: RootState) => state.auth.password;

export const isAuthenticatedSelector = (state: RootState) =>
  state.auth.username !== undefined && state.auth.password !== undefined;
