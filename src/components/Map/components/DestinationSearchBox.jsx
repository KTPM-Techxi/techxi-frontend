import { Box, ButtonGroup, IconButton } from '@chakra-ui/react';
import { Autocomplete } from '@react-google-maps/api';
import { Button, Input } from '@chakra-ui/react';
import React from 'react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';

const DestinationSearchBox = ({ handleDestinationPlaceChanged, destiantionRef, calculateRoute, clearRoute }) => {
  return (
    <>
      <Box flexGrow={1}>
        <Autocomplete
          onPlaceChanged={() => {
            handleDestinationPlaceChanged();
          }}
          options={{
            componentRestrictions: { country: 'VN' }, // Set the country restriction to Vietnam
          }}>
          <Input type="text" placeholder="Destination" ref={destiantionRef} />
        </Autocomplete>
      </Box>
      <ButtonGroup>
        <Button colorScheme="green" type="submit" onClick={calculateRoute} className="inline-flex gap-2">
          Calc {<FaLocationArrow />}
        </Button>
        <IconButton aria-label="center back" icon={<FaTimes />} onClick={clearRoute} />
      </ButtonGroup>
    </>
  );
};

export default DestinationSearchBox;
