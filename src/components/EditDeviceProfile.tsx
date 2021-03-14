import { Flex, FormControl, FormLabel, HStack, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DeviceProfile, IncludeInProfileType, SettingType } from 'types/models';
import { getSetting } from 'utils/deviceProfile';
import EditDeviceProfileTextInput from './EditDeviceProfileTextInput';
import EditDeviceProfileToggle from './EditDeviceProfileToggle';
import Form from './Form';

const EditDeviceProfile: React.FC<{ deviceProfile: DeviceProfile }> = ({ deviceProfile }) => {
  const [name, setName] = useState<string>(deviceProfile.Name);
  const [description, setDescription] = useState<string>(deviceProfile.Description);

  const network = deviceProfile?.Components?.find((component) => component.TypeName === 'Network');
  const getNetworkSetting = (type: SettingType) => getSetting(network, type);

  const [includeTelnet, setIncludeTelnet] = useState<boolean>(
    getNetworkSetting(SettingType.EnableTelnet)?.IncludeInProfile === IncludeInProfileType.Yes,
  );
  const [telnetEnabled, setTelnetEnabled] = useState<boolean>(
    getNetworkSetting(SettingType.EnableTelnet)?.Value !== false,
  );

  const [includeMulticast, setIncludeMulticast] = useState<boolean>(
    getNetworkSetting(SettingType.EnableMulticast)?.IncludeInProfile === IncludeInProfileType.Yes,
  );
  const [multicastEnabled, setMulticastEnabled] = useState<boolean>(
    getNetworkSetting(SettingType.EnableMulticast)?.Value !== false,
  );

  const [includeSSH, setIncludeSSH] = useState<boolean>(
    getNetworkSetting(SettingType.EnableSSH)?.IncludeInProfile === IncludeInProfileType.Yes,
  );
  const [sshEnabled, setSSHEnabled] = useState<boolean>(
    getNetworkSetting(SettingType.EnableSSH)?.Value !== false,
  );

  const [includeDomain, setIncludeDomain] = useState<boolean>(
    getNetworkSetting(SettingType.Domain)?.IncludeInProfile === IncludeInProfileType.Yes,
  );
  const [domain, setDomain] = useState<string>(
    `${getNetworkSetting(SettingType.Domain)?.Value ?? ''}`,
  );

  const getNetworkDNSSetting = (type: SettingType) =>
    getSetting(getNetworkSetting(SettingType.NetworkDNS), type);

  const [includePrimaryDNS, setIncludePrimaryDNS] = useState<boolean>(
    getNetworkDNSSetting(SettingType.PrimaryDNS)?.IncludeInProfile === IncludeInProfileType.Yes,
  );
  const [primaryDNS, setPrimaryDNS] = useState<string>(
    `${getNetworkSetting(SettingType.PrimaryDNS)?.Value ?? ''}`,
  );

  const [includeSecondaryDNS, setIncludeSecondaryDNS] = useState<boolean>(
    getNetworkDNSSetting(SettingType.SecondaryDNS)?.IncludeInProfile === IncludeInProfileType.Yes,
  );
  const [secondaryDNS, setSecondaryDNS] = useState<string>(
    `${getNetworkSetting(SettingType.SecondaryDNS)?.Value ?? ''}`,
  );

  return (
    <Flex overflow="auto" dir="column">
      <Form>
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
          <EditDeviceProfileTextInput
            label="Primary DNS"
            value={primaryDNS}
            include={includePrimaryDNS}
            onChange={setPrimaryDNS}
            onIncludeChange={setIncludePrimaryDNS}
          />
          <EditDeviceProfileTextInput
            label="Secondary DNS"
            value={secondaryDNS}
            include={includeSecondaryDNS}
            onChange={setSecondaryDNS}
            onIncludeChange={setIncludeSecondaryDNS}
          />
        </HStack>
      </Form>
    </Flex>
  );
};

export default EditDeviceProfile;
