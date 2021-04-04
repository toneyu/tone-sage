import { AddIcon } from '@chakra-ui/icons';
import { Accordion, Button, Flex, useToast } from '@chakra-ui/react';
import { QueryKey } from 'constants/query-keys';
import React from 'react';
import { addModal } from 'store/actions/modals';
import { getDeviceProfileAuth } from 'utils/api';
import { useSageQuery, useTypedDispatch } from 'utils/hooks';
import AddDeviceProfile from './AddDeviceProfile';
import DeviceProfileAccordionItem from './DeviceProfileAccordionItem';

const AdministratorRoleVerification = () => {
  const dispatch = useTypedDispatch();
  const getDeviceProfileQuery = useSageQuery(QueryKey.DEVICE_PROFILE, getDeviceProfileAuth());
  const deviceProfiles = getDeviceProfileQuery.data?.data.DeviceProfile;
  const toast = useToast();
  return (
    <Flex overflow="auto" flexDir="column">
      <Button
        onClick={async () => {
          await getDeviceProfileQuery.refetch();

          toast({
            title: 'Refreshed',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }}
      >
        Refresh
      </Button>
      <Button
        onClick={() =>
          dispatch(
            addModal('Add Device Profile', <AddDeviceProfile />, [
              {
                label: 'Close',
                onClick: () => {},
              },
            ]),
          )
        }
      >
        <AddIcon /> Add Device Profile
      </Button>
      s
      <Accordion allowMultiple>
        {deviceProfiles?.map((d) => (
          <DeviceProfileAccordionItem deviceProfile={d} key={d.Name} />
        ))}
      </Accordion>
    </Flex>
  );
};

export default AdministratorRoleVerification;
