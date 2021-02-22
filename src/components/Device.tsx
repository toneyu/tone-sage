import { Button, HStack, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { logout } from 'store/actions/auth';
import { addModal } from 'store/actions/modals';
import { putRebootAuth } from 'utils/api';
import { useSageMutation, useTypedDispatch } from 'utils/hooks';
import { TesiraDevice } from '../@types/models';

const Device: React.FC<{ device: TesiraDevice }> = ({ device }) => {
  const dispatch = useTypedDispatch();
  const putRebootMutation = useSageMutation(putRebootAuth(device.SerialNumber), {
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
    <HStack key={device.SerialNumber}>
      <Text>Status: &quot;{device.Status}&quot;</Text>
      <Text>OccupiedStatus: &quot;{device.OccupiedStatus}&quot;</Text>
      <Text>SerialNumber: &quot;{device.SerialNumber}&quot;</Text>
      <Button
        color="red"
        disabled={putRebootMutation.isLoading}
        onClick={() => putRebootMutation.mutate()}
      >
        Reboot
      </Button>
      {putRebootMutation.isError && <Text color="tomato">{putRebootMutation.error?.message}</Text>}
      {putRebootMutation.isLoading && <Spinner />}
      {putRebootMutation.isSuccess && <Text>Rebooted.</Text>}
    </HStack>
  );
};

export default Device;
