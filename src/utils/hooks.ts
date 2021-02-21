import { TypedDispatch } from '@types';
import { AxiosError } from 'axios';
import { QueryKey } from 'constants/query-keys';
import { StatusCodes } from 'http-status-codes';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setSession } from 'store/actions/auth';
import { addModal } from 'store/actions/modals';
import { RootState } from 'store/reducers';
import {
  passwordSelector,
  sessionIdSelector,
  usernameSelector,
} from 'store/selectors/auth';
import { postLogin } from 'utils/api';
import { Optional } from 'utility-types';

export const useTypedDispatch: () => TypedDispatch = useDispatch;

export const useTypedSelector: <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected = useSelector;

export const useSageQuery = <R>(
  queryKey: QueryKey,
  apiAuth: (sessionId: string) => Promise<R>
) => {
  let res: R | undefined;
  const dispatch = useTypedDispatch();
  let sessionId = useSelector(sessionIdSelector);
  const username = useSelector(usernameSelector);
  const password = useSelector(passwordSelector);
  const query = useQuery(
    queryKey,
    async () => {
      if (username !== undefined && password !== undefined) {
        if (sessionId === undefined) {
          const postLoginRes = await postLogin(username, password);
          sessionId = postLoginRes.data.LoginId;
          dispatch(setSession(sessionId));
        }

        try {
          res = await apiAuth(sessionId);
        } catch (error) {
          console.log(error);
          // FIXME: If status code is not unauthorized if the session key is invalid/expired find out which status code it is.
          if (error?.response?.status === StatusCodes.UNAUTHORIZED) {
            const postLoginRes = await postLogin(username, password);
            sessionId = postLoginRes.data.LoginId;
            dispatch(setSession(sessionId));
            res = await apiAuth(sessionId);
          }
          throw error;
        }
      } else {
        dispatch(logout());
      }

      return res;
    },
    {
      retry: false,
    }
  );

  const error = query.error as Optional<AxiosError>;

  if (error?.response) {
    // Request made and server responded
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    if (error.response.status === StatusCodes.UNAUTHORIZED) {
      dispatch(logout());
    } else {
      dispatch(
        addModal(
          'Error response received from SageVue API',
          `${error.response.status}: ${error.response.data}`,
          [
            {
              label: 'Try Again',
              onClick: () => {
                // noinspection JSIgnoredPromiseFromCall
                query.refetch();
              },
            },
            {
              label: 'Logout',
              onClick: logout,
            },
          ]
        )
      );
    }
  } else if (error?.request) {
    // The request was made but no response was received
    dispatch(
      addModal('Unable to connect to SageVue API', error.message, [
        {
          label: 'Try Again',
          onClick: () => {
            // noinspection JSIgnoredPromiseFromCall
            query.refetch();
          },
        },
        {
          label: 'Logout',
          onClick: logout,
        },
      ])
    );
  }

  return query;
};
