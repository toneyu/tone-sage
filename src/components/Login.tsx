import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { StatusCodes } from 'http-status-codes';
import React, { useState } from 'react';
import { login } from 'store/actions/auth';
import { postLogin } from 'utils/api';
import { useTypedDispatch, useTypedSelector } from 'utils/hooks';
import Form from './Form';

const Login: React.FC = () => {
  const savedUsername = useTypedSelector((state) => state.auth.username);
  const [username, setUsername] = useState<string>(savedUsername ?? '');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useTypedDispatch();

  return (
    <Form
      onSubmit={async () => {
        if (!isLoading) {
          setIsLoading(true);
          setErrorMessage(undefined);
          try {
            const postLoginRes = await postLogin(username, password);
            const sessionId = postLoginRes.data.LoginId;
            dispatch(login(username, password, sessionId));
          } catch (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              if (error.response.status === StatusCodes.UNAUTHORIZED) {
                setErrorMessage('Incorrect username or password');
              } else {
                setErrorMessage(error.response.data);
              }
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
              setErrorMessage(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
              setErrorMessage(error.message);
            }
          } finally {
            setIsLoading(false);
          }
        }
      }}
    >
      <Flex direction="column">
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type={!showPassword ? 'password' : ''}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Checkbox onChange={(e) => setShowPassword(e.target.checked)}>
          Show Password
        </Checkbox>
        <Button type="submit">Login</Button>
      </Flex>
      {isLoading && <Spinner />}
      {errorMessage && <Text color="tomato">{errorMessage}</Text>}
    </Form>
  );
};

export default Login;
