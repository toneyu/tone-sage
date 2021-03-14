import { Accordion, Button, Flex, useToast } from '@chakra-ui/react';
import { QueryKey } from 'constants/query-keys';
import React from 'react';
import { getDeviceProfileAuth } from 'utils/api';
import { useSageQuery } from 'utils/hooks';
import DeviceProfileAccordionItem from './DeviceProfileAccordionItem';

const AdministratorRoleVerification = () => {
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
      <Accordion allowMultiple>
        {deviceProfiles?.map((d) => (
          <DeviceProfileAccordionItem deviceProfile={d} key={d.Name} />
        ))}
      </Accordion>
    </Flex>
  );
};

export default AdministratorRoleVerification;
