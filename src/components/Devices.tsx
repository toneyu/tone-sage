import { Text, Divider, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import { getDeviceProfileAuth } from '../utils/api';
import { useSageQuery } from '../utils/hooks';
import { QueryKey } from '../constants/query-keys';

const Devices: React.FC<{ deviceName: string }> = ({ deviceName }) => {
  const getDeviceProfileQuery = useSageQuery(
    QueryKey.DEVICE_PROFILE,
    getDeviceProfileAuth()
  );
  const { isLoading, data } = getDeviceProfileQuery;

  const device = data?.data.DeviceProfile.find(
    (deviceProfile) => deviceProfile.Name === deviceName
  );
  const network = device?.Components?.find(
    (component) => component.TypeName === 'Network'
  );

  return (
    <Flex overflow="auto" dir="column">
      {getDeviceProfileQuery.error ? (
        `Error: ${JSON.stringify(getDeviceProfileQuery.error)}`
      ) : isLoading ? (
        <Spinner />
      ) : device ? (
        <Flex flexDir="column">
          Description: {device.Description} <Divider />
          Active: {network !== undefined ? 'On' : 'Off'} <Divider />
          {network && (
            <>
              Enable Telnet:{' '}
              {network.Settings.find(
                (component) => component.TypeName === 'EnableTelnet'
              )?.Value
                ? 'On'
                : 'Off'}
              <Divider />
              Enable Multicast:{' '}
              {network.Settings.find(
                (component) => component.TypeName === 'EnableMulticast'
              )?.Value
                ? 'On'
                : 'Off'}
              <Divider />
              Enable SSH:{' '}
              {network.Settings.find(
                (component) => component.TypeName === 'EnableSSH'
              )?.Value
                ? 'On'
                : 'Off'}
              <Divider />
              Domain:{' '}
              {network.Settings.find(
                (component) => component.TypeName === 'Domain'
              )?.Value ?? 'N/A'}
              <Divider />
              Primary DNS:{' '}
              {network.Settings.find(
                (component) => component.TypeName === 'NetworkDNS'
              )?.Settings.find((setting) => setting.TypeName === 'PrimaryDNS')
                ?.Value ?? 'N/A'}
              <Divider />
              Secondary DNS:{' '}
              {network.Settings.find(
                (component) => component.TypeName === 'NetworkDNS'
              )?.Settings.find((setting) => setting.TypeName === 'SecondaryDNS')
                ?.Value ?? 'N/A'}
              <Divider />
            </>
          )}
        </Flex>
      ) : (
        <Text>Missing {deviceName} in API response</Text>
      )}
    </Flex>
  );
};

export default Devices;
