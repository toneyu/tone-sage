import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import AdministratorRoleVerification from 'components/AdministratorRoleVerification';
import React from 'react';
import { logout } from 'store/actions/auth';
import { addModal } from 'store/actions/modals';
import { putRebootAuth } from 'utils/api';
import { useSageMutation, useTypedDispatch } from 'utils/hooks';

const Home = () => {
  const dispatch = useTypedDispatch();
  const putRebootMutation = useSageMutation(putRebootAuth('04112911'), {
    onSuccess: (data) => {
      if (!data.data.Result) {
        dispatch(
          addModal('Error ocurred when trying to reboot', data.data.Error, [
            {
              label: 'Retry',
              onClick: () => {
                putRebootMutation.mutate();
              },
            },
            {
              label: 'Relogin',
              onClick: () => {
                dispatch(logout());
              },
            },
          ]),
        );

        throw Error(data.data.Error);
      }
    },
  });

  return (
    <Flex overflow="auto" flexDir="column" align="start">
      {putRebootMutation.isError && <Text color="red">{putRebootMutation.error?.message}</Text>}
      {putRebootMutation.isLoading && <Spinner />}
      {putRebootMutation.isSuccess && (
        <Text>
          Rebooting... Please wait until device is rebooted on the website then refresh this app.
        </Text>
      )}
      <Button
        color="red"
        disabled={putRebootMutation.isLoading}
        onClick={() => putRebootMutation.mutate()}
      >
        Reboot
      </Button>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
      <AdministratorRoleVerification />
    </Flex>
  );
};

export default Home;
