import { Button, Flex, Spinner, useToast } from '@chakra-ui/react';
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
    <Flex overflow="auto" flexDir="column" align="start">
      <Button onClick={() => dispatch(logout())}>Logout</Button>
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
    </Flex>
  );
};

export default Home;
