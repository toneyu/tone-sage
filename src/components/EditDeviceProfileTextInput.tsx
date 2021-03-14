import { Checkbox, FormControl, FormLabel, HStack, Input } from '@chakra-ui/react';
import React from 'react';

const EditDeviceProfileTextInput: React.FC<{
  label: string;
  value: string;
  include: boolean;
  onChange: (value: string) => void;
  onIncludeChange: (checked: boolean) => void;
}> = ({ label, onChange, value, include, onIncludeChange }) => {
  return (
    <HStack>
      <Checkbox isChecked={include} onChange={(e) => onIncludeChange(e.target.checked)} />

      <FormControl isRequired>
        <FormLabel>{label}</FormLabel>
        <Input isDisabled={!include} value={value} onChange={(e) => onChange(e.target.value)} />
      </FormControl>
    </HStack>
  );
};

export default EditDeviceProfileTextInput;
