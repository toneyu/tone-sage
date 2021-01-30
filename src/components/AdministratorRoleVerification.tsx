import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { QueryKey } from 'constants/query-keys';
import React from 'react';
import { useQuery } from 'react-query';
import { getDeviceProfile } from 'utils/api';

const AdministratorRoleVerification = () => {
  const getDeviceProfileQuery = useQuery(QueryKey.DEVICE_PROFILE, () =>
    getDeviceProfile()
  );

  return (
    <Flex overflow="auto" dir="column">
      <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Flex>AMR Devices</Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Description: Americas Devices <Divider />
            Active: On <Divider />
            Enable Telnet: Off <Divider />
            Enable Multicast: On <Divider />
            Enable SSH: Off <Divider />
            Domain: dir.svc.accenture.com <Divider />
            Primary DNS: 10.30.23.4 <Divider />
            Secondary DNS: 10.30.23.5 <Divider />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Flex>EMEA Devices</Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Description: Americas Devices <Divider />
            Active: On <Divider />
            Enable Telnet: Off <Divider />
            Enable Multicast: On <Divider />
            Enable SSH: Off <Divider />
            Domain: dir.svc.accenture.com <Divider />
            Primary DNS: 10.30.23.4 <Divider />
            Secondary DNS: 10.30.23.5 <Divider />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Flex>APAC Devices</Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Description: Americas Devices <Divider />
            Active: On <Divider />
            Enable Telnet: Off <Divider />
            Enable Multicast: On <Divider />
            Enable SSH: Off <Divider />
            Domain: dir.svc.accenture.com <Divider />
            Primary DNS: 10.30.23.4 <Divider />
            Secondary DNS: 10.30.23.5 <Divider />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default AdministratorRoleVerification;
