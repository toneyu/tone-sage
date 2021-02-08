import { Box, Spinner } from '@chakra-ui/react';
import Login from 'components/Login';
import Modals from 'components/Modals';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import history from 'store/history';
import AdministratorRoleVerification from './components/AdministratorRoleVerification';
import {
  isAuthenticatedSelector,
  isRehydratedSelector,
} from './store/selectors/auth';
import { useTypedSelector } from './utils/hooks';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const isAuthenticated = useTypedSelector(isAuthenticatedSelector);
  const isRehydrated = useTypedSelector(isRehydratedSelector);

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectedRouter history={history}>
        <Box h="100vh" w="100vw" overflow="auto">
          {!isRehydrated ? (
            <Spinner />
          ) : (
            <Router>
              <Switch>
                <Route path="/login">
                  {isAuthenticated ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route path="/">
                  {isAuthenticated ? (
                    <AdministratorRoleVerification />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
              </Switch>
            </Router>
          )}
          <Modals />
        </Box>
      </ConnectedRouter>
    </QueryClientProvider>
  );
};

export default App;
