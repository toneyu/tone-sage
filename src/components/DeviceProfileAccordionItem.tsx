import { DeleteIcon } from '@chakra-ui/icons';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
} from '@chakra-ui/react';
import { QueryKey } from 'constants/query-keys';
import React from 'react';
import { useQueryClient } from 'react-query';
import { DeviceProfile as DeviceProfileType } from 'types/models';
import { deleteDeviceProfilesAuth } from 'utils/api';
import { useSageMutation } from 'utils/hooks';
import DeviceProfile from './DeviceProfile';

const DeviceProfileAccordionItem: React.FC<{ deviceProfile: DeviceProfileType }> = ({
  deviceProfile,
}) => {
  const queryClient = useQueryClient();
  const deleteDeviceProfileMutation = useSageMutation(deleteDeviceProfilesAuth(deviceProfile.Id), {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.DEVICES);
      queryClient.invalidateQueries(QueryKey.DEVICE_PROFILE);
    },
  });

  return (
    <AccordionItem key={deviceProfile.Name}>
      <Flex>
        <AccordionButton>
          {deviceProfile.Name}
          <AccordionIcon />
        </AccordionButton>
        <Button
          disabled={deleteDeviceProfileMutation.isLoading}
          onClick={() => deleteDeviceProfileMutation.mutate()}
        >
          <DeleteIcon />
        </Button>
      </Flex>
      <AccordionPanel pb={4}>
        <DeviceProfile deviceName={deviceProfile.Name} />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DeviceProfileAccordionItem;
