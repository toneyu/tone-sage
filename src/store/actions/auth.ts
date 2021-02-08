import { createAction } from 'typesafe-actions';

export const login = createAction(
  'auth/LOGIN',
  (username: string, password: string, sessionId: string) => ({
    username,
    password,
    sessionId,
  })
)();

export const setSession = createAction(
  'auth/SET_SESSION',
  (sessionId: string) => ({ sessionId })
)();
