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
import { useNavigate } from 'react-router-dom';
import { QueryKey } from '../../../constants/query-keys';

export const useTypedDispatch: () => TypedDispatch = useDispatch;

export const useTypedSelector = <T>(selector: (state: RootState) => T) =>
  useSelector<RootState>(selector);

export const useSageQuery = <R>(
  queryKey: QueryKey,
  apiAuth: (sessionId: string) => Promise<R>
) => {
  const dispatch = useTypedDispatch();
  let sessionId = useSelector(sessionIdSelector);
  const username = useSelector(usernameSelector);
  const password = useSelector(passwordSelector);
  const navigate = useNavigate();

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
    navigate('/login');
    return undefined;
  });
};
