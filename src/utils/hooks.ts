import { TypedDispatch } from '@types';
import { AxiosResponse } from 'axios';
import { QueryKey } from 'constants/query-keys';
import { StatusCodes } from 'http-status-codes';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setSession } from 'store/actions/auth';
import { addModal } from 'store/actions/modals';
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

  const { refetch } = useQuery(queryKey, async () => {
    if (username !== undefined && password !== undefined) {
      // TODO: do try catch outside of useQuery
      try {
        if (sessionId === undefined) {
          const postLoginRes = await postLogin(username, password);
          sessionId = postLoginRes.data.LoginId;
          dispatch(setSession(sessionId));
        }
        return apiAuth(sessionId);
      } catch (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if (error.response.status === StatusCodes.UNAUTHORIZED) {
            history.push('/login');
          } else {
            dispatch(
              addModal(
                'Error response received from SageVue API',
                `${error.response.status}: ${error.response.data}`,
                [
                  {
                    label: 'Try Again',
                    onClick: () => {
                      refetch();
                    },
                  },
                  {
                    label: 'Logout',
                    onClick: logout,
                  },
                ]
              )
            );
            setErrorMessage(error.response.data);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }

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
    }
  });
};
