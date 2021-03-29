import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { DeviceProfile, IncludeInProfile, SageType } from 'types/models';
import { putDeviceProfilesAuth } from 'utils/api';
import { getSetting } from 'utils/deviceProfile';
import { useSageMutation } from 'utils/hooks';
import EditDeviceProfileTextInput from './EditDeviceProfileTextInput';
import EditDeviceProfileToggle from './EditDeviceProfileToggle';
import Form from './Form';

const EditDeviceProfile: React.FC<{ deviceProfile: DeviceProfile }> = ({ deviceProfile }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [name, setName] = useState<string>(deviceProfile.Name);
  const [description, setDescription] = useState<string>(deviceProfile.Description);

  // eslint-disable-next-line
  const network = deviceProfile?.Components?.find((component) => component.TypeName === 'Network')!;
  const getNetworkSetting = (type: SageType) => getSetting(network, type);

  const [includeTelnet, setIncludeTelnet] = useState<boolean>(
    getNetworkSetting(SageType.EnableTelnet)?.IncludeInProfile === IncludeInProfile.Yes,
  );
  const [telnetEnabled, setTelnetEnabled] = useState<boolean>(
    getNetworkSetting(SageType.EnableTelnet)?.Value !== false,
  );

  const [includeMulticast, setIncludeMulticast] = useState<boolean>(
    getNetworkSetting(SageType.EnableMulticast)?.IncludeInProfile === IncludeInProfile.Yes,
  );
  const [multicastEnabled, setMulticastEnabled] = useState<boolean>(
    getNetworkSetting(SageType.EnableMulticast)?.Value !== false,
  );

  const [includeSSH, setIncludeSSH] = useState<boolean>(
    getNetworkSetting(SageType.EnableSSH)?.IncludeInProfile === IncludeInProfile.Yes,
  );
  const [sshEnabled, setSSHEnabled] = useState<boolean>(
    getNetworkSetting(SageType.EnableSSH)?.Value !== false,
  );

  const [includeDomain, setIncludeDomain] = useState<boolean>(
    getNetworkSetting(SageType.Domain)?.IncludeInProfile === IncludeInProfile.Yes,
  );
  const [domain, setDomain] = useState<string>(
    `${getNetworkSetting(SageType.Domain)?.Value ?? ''}`,
  );

  const getNetworkDNSSetting = (type: SageType) =>
    getSetting(getNetworkSetting(SageType.NetworkDNS), type);

  const [includeNetworkDNS, setIncludeNetworkDNS] = useState<boolean>(
    getNetworkDNSSetting(SageType.NetworkDNS)?.IncludeInProfile === IncludeInProfile.Yes,
  );

  const [primaryDNS, setPrimaryDNS] = useState<string>(
    `${getNetworkSetting(SageType.PrimaryDNS)?.Value ?? ''}`,
  );

  const [secondaryDNS, setSecondaryDNS] = useState<string>(
    `${getNetworkSetting(SageType.SecondaryDNS)?.Value ?? ''}`,
  );

  const saveMutation = useSageMutation(
    putDeviceProfilesAuth({
      ...deviceProfile,
      Name: name,
      Description: description,
      Components: [
        ...deviceProfile.Components.filter((component) => component.Type !== SageType.Network),
        {
          ...network,
          Settings: [
            {
              ...getNetworkSetting(SageType.EnableTelnet),
              Value: telnetEnabled,
              IncludeInProfile: includeTelnet ? IncludeInProfile.Yes : IncludeInProfile.No,
            },
            {
              ...getNetworkSetting(SageType.EnableMulticast),
              Value: multicastEnabled,
              IncludeInProfile: includeMulticast ? IncludeInProfile.Yes : IncludeInProfile.No,
            },
            {
              ...getNetworkSetting(SageType.EnableSSH),
              Value: sshEnabled,
              IncludeInProfile: includeSSH ? IncludeInProfile.Yes : IncludeInProfile.No,
            },
            {
              ...getNetworkSetting(SageType.Domain),
              Value: domain,
              IncludeInProfile: includeDomain ? IncludeInProfile.Yes : IncludeInProfile.No,
            },
            {
              ...getNetworkSetting(SageType.NetworkDNS),
              IncludeInProfile: includeNetworkDNS ? IncludeInProfile.Yes : IncludeInProfile.No,
              Settings: [
                ...(getNetworkSetting(SageType.NetworkDNS)?.Settings ?? []),
                {
                  ...getNetworkDNSSetting(SageType.PrimaryDNS),
                  Value: primaryDNS,
                  IncludeInProfile: includeNetworkDNS
                    ? IncludeInProfile.Yes
                    : IncludeInProfile.NotApplicable,
                },
                {
                  ...getNetworkDNSSetting(SageType.SecondaryDNS),
                  Value: secondaryDNS,
                  IncludeInProfile: includeNetworkDNS
                    ? IncludeInProfile.Yes
                    : IncludeInProfile.NotApplicable,
                },
              ],
            },
          ],
        },
      ],
    }),
  );

  return (
    <Form
      onSubmit={async () => {
        await saveMutation.mutateAsync();
        queryClient.invalidateQueries();
        toast({
          title: 'Saved',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }}
    >
      <HStack flexDir="column" alignItems="start">
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <EditDeviceProfileToggle
          label="Telnet"
          isChecked={telnetEnabled}
          include={includeTelnet}
          onChange={setTelnetEnabled}
          onIncludeChange={setIncludeTelnet}
        />
        <EditDeviceProfileToggle
          label="Multicast"
          isChecked={multicastEnabled}
          include={includeMulticast}
          onChange={setMulticastEnabled}
          onIncludeChange={setIncludeMulticast}
        />
        <EditDeviceProfileToggle
          label="SSH"
          isChecked={sshEnabled}
          include={includeSSH}
          onChange={setSSHEnabled}
          onIncludeChange={setIncludeSSH}
        />
        <EditDeviceProfileTextInput
          label="Domain"
          value={domain}
          include={includeDomain}
          onChange={setDomain}
          onIncludeChange={setIncludeDomain}
        />

        <HStack>
          <Checkbox
            isChecked={includeNetworkDNS}
            onChange={(e) => setIncludeNetworkDNS(e.target.checked)}
          />

          <FormControl isRequired>
            <FormLabel>Primary DNS</FormLabel>
            <Input
              isDisabled={!includeNetworkDNS}
              value={primaryDNS}
              onChange={(e) => setPrimaryDNS(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Secondary DNS</FormLabel>
            <Input
              isDisabled={!includeNetworkDNS}
              value={secondaryDNS}
              onChange={(e) => setSecondaryDNS(e.target.value)}
            />
          </FormControl>
        </HStack>

        <Button type="submit">Save</Button>
      </HStack>
    </Form>
  );
};

export default EditDeviceProfile;
