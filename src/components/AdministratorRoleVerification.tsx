import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Flex,
} from '@chakra-ui/react';
import React from 'react';

const AdministratorRoleVerification = () => {
  // const getDeviceProfileQuery = useSageQuery(
  //   QueryKey.DEVICE_PROFILE,
  //   getDeviceProfileAuth()
  // );
  // const { isLoading } = getDeviceProfileQuery;
  // console.log(getDeviceProfileQuery);

  return (
    <Flex overflow="auto" dir="column">
      {/* {isLoading ? (
        <Spinner />
      ) : ( */}
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
      {/* )} */}
    </Flex>
  );
};

export default AdministratorRoleVerification;
