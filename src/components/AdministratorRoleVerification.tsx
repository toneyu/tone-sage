import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { getDeviceProfileAuth } from '../utils/api';
import { useSageQuery } from '../utils/hooks';
import { QueryKey } from '../constants/query-keys';
import Devices from './Devices';

const AdministratorRoleVerification = () => {
  const getDeviceProfileQuery = useSageQuery(
    QueryKey.DEVICE_PROFILE,
    getDeviceProfileAuth()
  );
  const { isLoading } = getDeviceProfileQuery;
  console.log(getDeviceProfileQuery);

  return (
    <Flex overflow="auto" dir="column">
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </Flex>
  );
};

export default AdministratorRoleVerification;
