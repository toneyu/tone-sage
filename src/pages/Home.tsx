import { Button, HStack, Spinner, useToast } from '@chakra-ui/react';
import AdministratorRoleVerification from 'components/AdministratorRoleVerification';
import Device from 'components/Device';
import { QueryKey } from 'constants/query-keys';
import React from 'react';
import { logout } from 'store/actions/auth';
import { getDevicesAuth } from 'utils/api';
import { useSageQuery, useTypedDispatch } from 'utils/hooks';

const Home = () => {
  const dispatch = useTypedDispatch();
  const getDevicesQuery = useSageQuery(QueryKey.DEVICES, getDevicesAuth());
  const toast = useToast();

  return (
    <HStack overflow="auto" flexDirection="column" align="stretch">
      <Button backgroundColor="tomato" onClick={() => dispatch(logout())}>
        Logout
      </Button>
      <Button
        onClick={async () => {
          await getDevicesQuery.refetch();

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
      {getDevicesQuery.isLoading ? (
        <Spinner />
      ) : (
        getDevicesQuery.data?.data.TesiraDevices.map((device) => (
          <Device key={device.SerialNumber} device={device} />
        ))
      )}
      <AdministratorRoleVerification />
    </HStack>
  );
};

export default Home;
