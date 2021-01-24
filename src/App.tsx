import { Box } from '@chakra-ui/react';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, useRoutes } from 'react-router-dom';
import { ROUTES } from 'routes';
import AdministratorRoleVerification from './components/AdministratorRoleVerification';
import { history } from './configureStore';

const Hello: React.FC = () => {
  return (
    <Box h="100vh" w="100vw" overflow="auto">
      {/* <DeviceProfile /> */}
      <AdministratorRoleVerification />
      {/* <Box className="Hello">
        <Image width="200px" alt="icon" src={icon} />
      </Box>
      <Heading>electron-react-boilerplate</Heading>
      <Box className="Hello">
        <Button type="button">
          <span role="img" aria-label="books">
            📚
          </span>
          Read our docs
        </Button>
        <Button type="button">
          <span role="img" aria-label="books">
            🙏
          </span>
          Donate
        </Button>
      </Box> */}
    </Box>
  );
};

const queryClient = new QueryClient();

export default function App() {
  useRoute;
  return (
    <ConnectedRouter history={history}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            {Object.entries(ROUTES).map(([key, Route]) => (
              <Route key={key} />
            ))}
          </Switch>
        </Router>
      </QueryClientProvider>
    </ConnectedRouter>
  );
}
