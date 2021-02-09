import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import Devices from './Devices';
import { logout } from '../store/actions/auth';

const AdministratorRoleVerification = () => {
  const dispatch = useDispatch();

  return (
    <Flex overflow="auto" dir="column">
      <Button onClick={() => dispatch(logout())}>Logout</Button>
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
