import React, { useState } from 'react';
import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { LocalStorageKeys } from 'constants/local-storage-keys';
import { useLocalStorage } from 'react-use';
import { postLogin } from 'utils/api';
import { useSelector } from 'react-redux';
import { useTypedSelector } from 'utils/hooks';
import Form from './Form';

const Login: React.FC = () => {
  // const [username, setUsername] = useLocalStorage<string>(
  //   LocalStorageKeys.USERNAME_LOGIN,
  //   ''
  // );
  // const [password, setPassword] = useLocalStorage<string>(
  //   LocalStorageKeys.PASSWORD_LOGIN,
  //   ''
  // );
  const savedUsername = useTypedSelector((state) => state.auth.username);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form
      onSubmit={async () => {
        if (username && password) {
          const postLoginRes = await postLogin(username, password);
          const sessionId = postLoginRes.data.LoginId;
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" />
      </Flex>
    </Form>
  );
};

export default Login;
