import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
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
import { addModal } from 'store/actions/modals';
import { DeviceProfile as DeviceProfileType } from 'types/models';
import { deleteDeviceProfilesAuth } from 'utils/api';
import { useSageMutation, useTypedDispatch } from 'utils/hooks';
import DeviceProfile from './DeviceProfile';
import EditDeviceProfile from './EditDeviceProfile';

const DeviceProfileAccordionItem: React.FC<{ deviceProfile: DeviceProfileType }> = ({
  deviceProfile,
}) => {
  const dispatch = useTypedDispatch();
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

        <Button
          onClick={() =>
            dispatch(
              addModal(
                `Edit device ${deviceProfile.Name}`,
                <EditDeviceProfile deviceProfile={deviceProfile} />,
                [
                  {
                    label: 'Close',
                    onClick: () => {},
                  },
                ],
              ),
            )
          }
        >
          <EditIcon />
        </Button>
      </Flex>
      <AccordionPanel pb={4}>
        <DeviceProfile deviceName={deviceProfile.Name} />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DeviceProfileAccordionItem;
