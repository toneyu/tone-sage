import { Box } from '@chakra-ui/react';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import AdministratorRoleVerification from './components/AdministratorRoleVerification';
import { history } from './store/configureStore';
import Login from './components/Login';
import { useTypedSelector } from './store/sagas/utils/hooks';
import { isAuthenticatedSelector } from './store/selectors/auth';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const isAuthenticated = useTypedSelector(isAuthenticatedSelector);

  return (
    <ConnectedRouter history={history}>
      <QueryClientProvider client={queryClient}>
        <Box h="100vh" w="100vw" overflow="auto">
          <Router>
            <Routes>
              <Route
                path="/admin"
                element={
                  isAuthenticated ? (
                    <AdministratorRoleVerification />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </Box>
      </QueryClientProvider>
    </ConnectedRouter>
  );
};

export default App;
