import { Box, HStack, IconButton, Text, Select } from '@chakra-ui/react';
import React from 'react';
import { FaDirections, FaLocationArrow } from 'react-icons/fa';
import Geocode from 'react-geocode';
import { useDispatch, useSelector } from 'react-redux';
import { setTransportationMode } from '../mapSlice';

const FinalCalculation = ({ map, distance, duration, handleBackToMap }) => {
  const originStore = useSelector((state) => state.map.origin);
  const transportationMode = useSelector((state) => state.map.transportationMode);
  const dispatch = useDispatch();
  return (
    <HStack spacing={4} justifyContent="space-between">
      <Box className="relative">
        <FaDirections size={'30px'} color="#1a73e8" className="cursor-pointer hover:fill-[#1b5fb8] transition-all" onClick={() => handleBackToMap(map, Geocode.fromAddress(originStore))} />
      </Box>
      <Text flexGrow={1}>Distance: {distance} </Text>
      <Text flexGrow={1}>Duration: {duration} </Text>
      <Box flexGrow={1}>
        <Select value={transportationMode} onChange={(e) => dispatch(setTransportationMode(e.target.value))}>
          <option value="DRIVING">Car Driving</option>
          <option value="TWO_WHEELER">Motobike Driving</option>
          <option value="BICYCLING">Bicycling</option>
          <option value="TRANSIT">Transit</option>
          <option value="WALKING">Walking</option>
        </Select>
      </Box>
      <IconButton
        aria-label="center back"
        icon={<FaLocationArrow />}
        isRound
        onClick={() => {
          map.panTo();
          map.setZoom(18);
        }}
      />
    </HStack>
  );
};

export default FinalCalculation;
