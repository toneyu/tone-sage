import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box, Button, Heading, Image } from '@chakra-ui/react';
import icon from '../assets/icon.svg';

const Hello = () => {
  return (
    <Box>
      <Box className="Hello">
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
      </Box>
    </Box>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
