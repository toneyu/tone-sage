import { Button, Divider, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { IncludeInProfile, SageType } from 'types/models';
import { getSetting } from 'utils/deviceProfile';
import { QueryKey } from '../constants/query-keys';
import { getDeviceProfileAuth } from '../utils/api';
import { useSageQuery } from '../utils/hooks';

const DeviceProfile: React.FC<{ deviceName: string }> = ({ deviceName }) => {
  const getDeviceProfileQuery = useSageQuery(QueryKey.DEVICE_PROFILE, getDeviceProfileAuth());
  const { isLoading, data } = getDeviceProfileQuery;
  const toast = useToast();

  const device = data?.data.DeviceProfile.find(
    (deviceProfile) => deviceProfile.Name === deviceName,
  );
  const network = device?.Components?.find((component) => component.TypeName === 'Network');
  const telnetSetting = getSetting(network, SageType.EnableTelnet);
  const multicastSetting = getSetting(network, SageType.EnableMulticast);
  const sshSetting = getSetting(network, SageType.EnableSSH);
  const domainSetting = getSetting(network, SageType.Domain);
  const networkDNSSetting = getSetting(network, SageType.NetworkDNS);
  const primaryDNSSetting = getSetting(networkDNSSetting, SageType.PrimaryDNS);
  const secondaryDNSSetting = getSetting(networkDNSSetting, SageType.SecondaryDNS);

  return (
    <Flex overflow="auto" dir="column">
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
              {telnetSetting?.IncludeInProfile === IncludeInProfile.Yes
                ? telnetSetting.Value
                  ? 'On'
                  : 'Off'
                : 'N/A'}
              <Divider />
              Enable Multicast:{' '}
              {multicastSetting?.IncludeInProfile === IncludeInProfile.Yes
                ? multicastSetting.Value
                  ? 'On'
                  : 'Off'
                : 'N/A'}
              <Divider />
              Enable SSH:{' '}
              {sshSetting?.IncludeInProfile === IncludeInProfile.Yes
                ? sshSetting.Value
                  ? 'On'
                  : 'Off'
                : 'N/A'}
              <Divider />
              Domain:{' '}
              {domainSetting?.IncludeInProfile === IncludeInProfile.Yes
                ? domainSetting.Value ?? 'N/A'
                : 'N/A'}
              <Divider />
              Primary DNS:{' '}
              {primaryDNSSetting?.IncludeInProfile === IncludeInProfile.Yes
                ? primaryDNSSetting.Value ?? 'N/A'
                : 'N/A'}
              <Divider />
              Secondary DNS:{' '}
              {secondaryDNSSetting?.IncludeInProfile === IncludeInProfile.Yes
                ? secondaryDNSSetting.Value ?? 'N/A'
                : 'N/A'}
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

export default DeviceProfile;
