import { createAction } from 'typesafe-actions';

export const login = createAction(
  'auth/LOGIN',
  (username: string, password: string, sessionId: string, url: string) => ({
    username,
    password,
    sessionId,
    url,
  }),
)();

export const setSession = createAction('auth/SET_SESSION', (sessionId: string) => ({
  sessionId,
}))();

export const logout = createAction('auth/LOGOUT')();
