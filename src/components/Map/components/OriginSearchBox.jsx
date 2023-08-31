import { Box, Input } from '@chakra-ui/react';
import { Autocomplete } from '@react-google-maps/api';
import React from 'react';

const OriginSearchBox = ({ handleOriginPlaceChanged, setState, originRef }) => {
  return (
    <Box flexGrow={3}>
      <Autocomplete
        onPlaceChanged={handleOriginPlaceChanged}
        // onLoad={handleOriginPlaceChanged}
        options={{
          componentRestrictions: { country: 'VN' }, // Set the country restriction to Vietnam
        }}>
        <Input
          type="text"
          placeholder="Origin"
          ref={originRef}
          onChange={(e) => {
            if (!e.target.value) {
              setState({ isSearch: false });
            }
          }}
        />
      </Autocomplete>
    </Box>
  );
};

export default OriginSearchBox;
