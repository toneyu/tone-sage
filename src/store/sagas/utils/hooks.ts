import { TypedDispatch } from '@types';
import { postLogin } from 'utils/api';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from 'store/actions/auth';
import { RootState } from 'store/reducers';
import {
  passwordSelector,
  sessionIdSelector,
  usernameSelector,
} from 'store/selectors/auth';

export const useTypedDispatch: () => TypedDispatch = () => useDispatch();

export const useTypedSelector = (...args: Parameters<typeof useSelector>) =>
  useSelector<RootState>(...args);

export const useSageQuery = (
  queryKey: QueryKey,
  apiAuth: (sessionId: string) => Promise<R>
) => {
  const dispatch = useTypedDispatch();
  let sessionId = useSelector(sessionIdSelector);
  const username = useSelector(usernameSelector);
  const password = useSelector(passwordSelector);

  return useQuery(queryKey, async () => {
    if (sessionId === undefined) {
      if (username === undefined || password === undefined) {
        history.pushState;
      }
      const postLoginRes = await postLogin(username, password);
      sessionId = postLoginRes.data.LoginId;
      dispatch(setSession(sessionId));
    }
    return apiAuth(sessionId);
  });
};
