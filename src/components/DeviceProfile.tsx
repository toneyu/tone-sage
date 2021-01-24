import React, { useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

const DeviceProfile: React.FC = () => {
  const [name, setName] = useState('AMR Devices');
  const [description, setDescription] = useState('Americas Devices');

  return (
    <Flex direction="column">
      <Flex direction="row">
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
      </Flex>
      <Tabs>
        <TabList>
          <Tab>Network</Tab>
          <Tab>VoIP</Tab>
          <Tab>802.1X</Tab>
          <Tab>Labels</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex>
              <FormControl>
                <FormLabel>Active</FormLabel>
                <Flex direction="row">
                  <FormLabel>Off</FormLabel>
                  <Switch id="email-alerts" />
                  <FormLabel>On</FormLabel>
                </Flex>
              </FormControl>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default DeviceProfile;
