import { Checkbox, FormControl, FormLabel, HStack, Switch } from '@chakra-ui/react';
import React from 'react';

const EditDeviceProfileToggle: React.FC<{
  label: string;
  isChecked: boolean;
  include: boolean;
  onChange: (checked: boolean) => void;
  onIncludeChange: (checked: boolean) => void;
}> = ({ label, onChange, isChecked, include, onIncludeChange }) => {
  return (
    <HStack>
      <Checkbox isChecked={include} onChange={(e) => onIncludeChange(e.target.checked)} />
      <FormControl isRequired>
        <FormLabel>Enable {label}</FormLabel>
        <Switch
          isDisabled={!include}
          isChecked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
        />
      </FormControl>
    </HStack>
  );
};

export default EditDeviceProfileToggle;
