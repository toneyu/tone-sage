import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { IncludeInProfile } from 'types/models';
import { postDeviceProfilesAuth } from 'utils/api';
import { useSageMutation } from 'utils/hooks';
import EditDeviceProfileTextInput from './EditDeviceProfileTextInput';
import EditDeviceProfileToggle from './EditDeviceProfileToggle';
import Form from './Form';

const AddDeviceProfile: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [includeTelnet, setIncludeTelnet] = useState<boolean>(false);
  const [telnetEnabled, setTelnetEnabled] = useState<boolean>(false);

  const [includeMulticast, setIncludeMulticast] = useState<boolean>(false);
  const [multicastEnabled, setMulticastEnabled] = useState<boolean>(false);

  const [includeSSH, setIncludeSSH] = useState<boolean>(false);
  const [sshEnabled, setSSHEnabled] = useState<boolean>(false);

  const [includeDomain, setIncludeDomain] = useState<boolean>(false);
  const [domain, setDomain] = useState<string>('');

  const [includeNetworkDNS, setIncludeNetworkDNS] = useState<boolean>(false);

  const [primaryDNS, setPrimaryDNS] = useState<string>('');

  const [secondaryDNS, setSecondaryDNS] = useState<string>('');

  const saveMutation = useSageMutation(
    postDeviceProfilesAuth({
      Id: '00000000-0000-0000-0000-000000000000',
      Name: name,
      Description: description,
      Type: 1,
      TypeName: 'Tesira',
      Version: '',
      UseSageVue: false,
      MonitorDevices: false,
      Components: [
        {
          Name: 'Network',
          Type: 1,
          TypeName: 'Network',
          IncludeInProfile: IncludeInProfile.Yes,
          Settings: [
            {
              Type: 101,
              TypeName: 'EnableTelnet',
              ElementNumber: 0,
              DataType: 'Bool',
              Value: telnetEnabled,
              IncludeInProfile: includeTelnet ? IncludeInProfile.Yes : IncludeInProfile.No,
              Settings: [],
            },
            {
              Type: 102,
              TypeName: 'EnableMulticast',
              ElementNumber: 0,
              DataType: 'Bool',
              Value: multicastEnabled,
              IncludeInProfile: includeMulticast ? IncludeInProfile.Yes : IncludeInProfile.No,
              Settings: [],
            },
            {
              Type: 103,
              TypeName: 'EnableSSH',
              ElementNumber: 0,
              DataType: 'Bool',
              Value: sshEnabled,
              IncludeInProfile: includeSSH ? IncludeInProfile.Yes : IncludeInProfile.No,
              Settings: [],
            },
            {
              Type: 104,
              TypeName: 'Domain',
              ElementNumber: 0,
              DataType: 'String',
              Value: domain,
              IncludeInProfile: includeDomain ? IncludeInProfile.Yes : IncludeInProfile.No,
              Settings: [],
            },
            {
              Type: 105,
              TypeName: 'NetworkDNS',
              ElementNumber: 0,
              DataType: 'Setting',
              Value: '',
              IncludeInProfile: includeNetworkDNS ? IncludeInProfile.Yes : IncludeInProfile.No,
              Settings: [
                {
                  Type: 106,
                  TypeName: 'PrimaryDNS',
                  ElementNumber: 0,
                  DataType: 'String',
                  Value: primaryDNS,
                  IncludeInProfile: includeNetworkDNS
                    ? IncludeInProfile.Yes
                    : IncludeInProfile.NotApplicable,
                  Settings: [],
                },
                {
                  Type: 107,
                  TypeName: 'SecondaryDNS',
                  ElementNumber: 0,
                  DataType: 'String',
                  Value: secondaryDNS,
                  IncludeInProfile: includeNetworkDNS
                    ? IncludeInProfile.Yes
                    : IncludeInProfile.NotApplicable,
                  Settings: [],
                },
              ],
            },
          ],
        },
        {
          Name: 'VoIP',
          Type: 2,
          TypeName: 'VoIP',
          IncludeInProfile: IncludeInProfile.No,
          Settings: [
            {
              Type: 201,
              TypeName: 'VLAN',
              ElementNumber: 0,
              DataType: 'Setting',
              Value: '',
              IncludeInProfile: IncludeInProfile.No,
              Settings: [
                {
                  Type: 203,
                  TypeName: 'VLANId',
                  ElementNumber: 0,
                  DataType: 'String',
                  Value: '',
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [],
                },
                {
                  Type: 202,
                  TypeName: 'VLANTagging',
                  ElementNumber: 0,
                  DataType: 'Bool',
                  Value: false,
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [],
                },
              ],
            },
            {
              Type: 204,
              TypeName: 'Network',
              ElementNumber: 0,
              DataType: 'Setting',
              Value: '',
              IncludeInProfile: IncludeInProfile.No,
              Settings: [
                {
                  Type: 205,
                  TypeName: 'DomainName',
                  ElementNumber: 0,
                  DataType: 'String',
                  Value: '',
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [],
                },
                {
                  Type: 206,
                  TypeName: 'DNSPrimary',
                  ElementNumber: 0,
                  DataType: 'String',
                  Value: '',
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [],
                },
                {
                  Type: 207,
                  TypeName: 'DNSSecondary',
                  ElementNumber: 0,
                  DataType: 'String',
                  Value: '',
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [],
                },
              ],
            },
            {
              Type: 208,
              TypeName: 'VoIPLines',
              ElementNumber: 0,
              DataType: 'Setting',
              Value: '',
              IncludeInProfile: IncludeInProfile.No,
              Settings: [
                {
                  Type: 209,
                  TypeName: 'VoIPLine',
                  ElementNumber: 1,
                  DataType: 'SettingCollection',
                  Value: '',
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [
                    {
                      Type: 210,
                      TypeName: 'ProxyVendor',
                      ElementNumber: 1,
                      DataType: 'String',
                      Value: '',
                      IncludeInProfile: IncludeInProfile.NotApplicable,
                      Settings: [],
                    },
                    {
                      Type: 211,
                      TypeName: 'ProxyAddress',
                      ElementNumber: 1,
                      DataType: 'String',
                      Value: '',
                      IncludeInProfile: IncludeInProfile.NotApplicable,
                      Settings: [],
                    },
                    {
                      Type: 212,
                      TypeName: 'ProxyPort',
                      ElementNumber: 1,
                      DataType: 'String',
                      Value: '',
                      IncludeInProfile: IncludeInProfile.NotApplicable,
                      Settings: [],
                    },
                    {
                      Type: 213,
                      TypeName: 'SIPDomain',
                      ElementNumber: 1,
                      DataType: 'String',
                      Value: '',
                      IncludeInProfile: IncludeInProfile.NotApplicable,
                      Settings: [],
                    },
                    {
                      Type: 218,
                      TypeName: 'BIOSDomain',
                      ElementNumber: 1,
                      DataType: 'String',
                      Value: '',
                      IncludeInProfile: IncludeInProfile.NotApplicable,
                      Settings: [],
                    },
                  ],
                },
                {
                  Type: 209,
                  TypeName: 'VoIPLine',
                  ElementNumber: 2,
                  DataType: 'SettingCollection',
                  Value: '',
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [
                    {
                      Type: 210,
                      TypeName: 'ProxyVendor',
                      ElementNumber: 2,
                      DataType: 'String',
                      Value: '',
                      IncludeInProfile: IncludeInProfile.NotApplicable,
                      Settings: [],
                    },
                    {
                      Type: 211,
                      TypeName: 'ProxyAddress',
                      ElementNumber: 2,
                      DataType: 'String',
                      Value: '',
                      IncludeInProfile: IncludeInProfile.NotApplicable,
                      Settings: [],
                    },
                    {
                      Type: 212,
                      TypeName: 'ProxyPort',
                      ElementNumber: 2,
                      DataType: 'String',
                      Value: '',
                      IncludeInProfile: IncludeInProfile.NotApplicable,
                      Settings: [],
                    },
                    {
                      Type: 213,
                      TypeName: 'SIPDomain',
                      ElementNumber: 2,
                      DataType: 'String',
                      Value: '',
                      IncludeInProfile: IncludeInProfile.NotApplicable,
                      Settings: [],
                    },
                    {
                      Type: 218,
                      TypeName: 'BIOSDomain',
                      ElementNumber: 2,
                      DataType: 'String',
                      Value: '',
                      IncludeInProfile: IncludeInProfile.NotApplicable,
                      Settings: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          Name: '802.1X',
          Type: 3,
          TypeName: '_8021X',
          IncludeInProfile: IncludeInProfile.No,
          Settings: [
            {
              Type: 301,
              TypeName: '_8021X',
              ElementNumber: 0,
              DataType: 'Setting',
              Value: '',
              IncludeInProfile: IncludeInProfile.No,
              Settings: [
                {
                  Type: 302,
                  TypeName: 'Interface',
                  ElementNumber: 0,
                  DataType: 'String',
                  Value: '',
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [],
                },
                {
                  Type: 303,
                  TypeName: 'Mode',
                  ElementNumber: 0,
                  DataType: 'String',
                  Value: '',
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [],
                },
                {
                  Type: 304,
                  TypeName: 'FastMethod',
                  ElementNumber: 0,
                  DataType: 'Bool',
                  Value: false,
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [],
                },
                {
                  Type: 305,
                  TypeName: 'AnonIdentity',
                  ElementNumber: 0,
                  DataType: 'String',
                  Value: '',
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [],
                },
                {
                  Type: 306,
                  TypeName: 'Identity',
                  ElementNumber: 0,
                  DataType: 'String',
                  Value: '',
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [],
                },
                {
                  Type: 307,
                  TypeName: 'IdentityPswd',
                  ElementNumber: 0,
                  DataType: 'String',
                  Value: '',
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [],
                },
                {
                  Type: 308,
                  TypeName: 'RootCertificate',
                  ElementNumber: 0,
                  DataType: 'ByteArray',
                  Value: '',
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [],
                },
                {
                  Type: 309,
                  TypeName: 'ClientCertificate',
                  ElementNumber: 0,
                  DataType: 'ByteArray',
                  Value: '',
                  IncludeInProfile: IncludeInProfile.NotApplicable,
                  Settings: [],
                },
              ],
            },
          ],
        },
        {
          Name: 'Labels',
          Type: 4,
          TypeName: 'Labels',
          IncludeInProfile: IncludeInProfile.No,
          Settings: [
            {
              Type: 401,
              TypeName: 'Labels',
              ElementNumber: 0,
              DataType: 'StringList',
              Value: '',
              IncludeInProfile: IncludeInProfile.No,
              Settings: [],
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

export default AddDeviceProfile;
