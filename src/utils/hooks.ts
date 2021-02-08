import { TypedDispatch } from '@types';
import { AxiosResponse } from 'axios';
import { QueryKey } from 'constants/query-keys';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from 'store/actions/auth';
import history from 'store/history';
import { RootState } from 'store/reducers';
import {
  passwordSelector,
  sessionIdSelector,
  usernameSelector,
} from 'store/selectors/auth';
import { postLogin } from 'utils/api';

export const useTypedDispatch: () => TypedDispatch = useDispatch;

export const useTypedSelector: <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected = useSelector;

export const useSageQuery = <R>(
  queryKey: QueryKey,
  apiAuth: (sessionId: string) => AxiosResponse<R>
) => {
  const dispatch = useTypedDispatch();
  let sessionId = useSelector(sessionIdSelector);
  const username = useSelector(usernameSelector);
  const password = useSelector(passwordSelector);

  return useQuery(queryKey, async () => {
    if (sessionId !== undefined) {
      return apiAuth(sessionId);
    }
    if (username !== undefined && password !== undefined) {
      const postLoginRes = await postLogin(username, password);
      sessionId = postLoginRes.data.LoginId;
      dispatch(setSession(sessionId));
      return apiAuth(sessionId);
    }
    history.push('/login');
    return undefined;
  });
};
