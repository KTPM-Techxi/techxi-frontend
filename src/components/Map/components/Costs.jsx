import { Box, Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { calCulateFees } from '../../../../utils/helpers';
import { TbMapPinSearch } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { Numeral } from 'react-numeral';
import Geocode from 'react-geocode';

const Costs = ({ map, distance, duration, handleBackToMap, handleFindDrivers }) => {
  const originStore = useSelector((state) => state.map.origin);

  return (
    <HStack spacing={4} justifyContent="flex-start">
      <Box className="relative">
        <FaMoneyBillAlt size={'30px'} color="#54be6e" className="cursor-pointer hover:fill-[#31af51] transition-all" onClick={() => handleBackToMap(map, Geocode.fromAddress(originStore))} />
      </Box>
      <Text flexGrow={1.2}>
        Costs: <Numeral value={calCulateFees(+distance.split('')[0], +duration.split('')[0], 100000, 100000, 10000)} format={'0,0'} />
        {' đ'}
      </Text>
      <Button flexGrow={1} colorScheme="green" type="submit" onClick={handleFindDrivers} className="inline-flex gap-2">
        Find nearby drivers {<TbMapPinSearch size={'30px'} />}
      </Button>
    </HStack>
  );
};

export default Costs;
