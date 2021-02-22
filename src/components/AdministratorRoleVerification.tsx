import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import Devices from './Devices';

const AdministratorRoleVerification = () => {
  return (
    <Flex overflow="auto" flexDir="column">
      <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Flex>AMR Devices</Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Devices deviceName="AMR Devices" />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Flex>EMEA Devices</Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Devices deviceName="EMEA Devices" />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Flex>APAC Devices</Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Devices deviceName="APAC Devices" />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default AdministratorRoleVerification;
