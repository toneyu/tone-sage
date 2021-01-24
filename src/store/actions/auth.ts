import { createAction } from 'typesafe-actions';

export const login = createAction(
  'auth/LOGIN',
  (username: string, password: string) => ({ username, password })
)();

export const setSession = createAction(
  'auth/SET_SESSION',
  (sessionId: string) => ({ sessionId })
)();
