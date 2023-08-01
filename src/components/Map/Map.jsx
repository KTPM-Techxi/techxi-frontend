import { Box, Button, ButtonGroup, Flex, HStack, IconButton, Input, SkeletonText, Text, Select, Textarea, Stack, SkeletonCircle } from '@chakra-ui/react';
import { FaLocationArrow, FaTimes, FaDirections, FaMapMarkerAlt, FaCircle, FaExchangeAlt } from 'react-icons/fa';

import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setDestination, setOrigin } from '../../app/reducers/mapSlice';
const center = { lat: 10.762831, lng: 106.682476 };

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places', 'geometry', 'geocoding']
  });

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [transportationMode, setTransportationMode] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const originRef = useRef(null);
  const destiantionRef = useRef(null);
  const dispatch = useDispatch()
  const originStore = useSelector((state) => state.map.origin);
  const destinationStore = useSelector((state) => state.map.destination);
  function handleBackToMap() {
    map.panTo(center);
    map.setZoom(18);
    console.log('hello');
  }
  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode[transportationMode ? transportationMode : 'DRIVING']
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destiantionRef.current.value = '';
    setIsSearch(false);
  }
  function handleOriginPlaceChanged() {
    const place = originRef.current.value.toString();
    console.log(place);
    if (!place) return;
    else setIsSearch(true);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: place }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry.location;
        map.panTo({ lat: location.lat(), lng: location.lng() });
        map.setZoom(15);
        dispatch(setOrigin(place))
      } else {
        console.error('Geocoder failed due to: ', status);
      }
    });
  }
  useEffect(() => {
    console.log(originStore);
    console.log(destinationStore);

    return () => {
      console.log('clean up');
    }
  }, [originStore, destinationStore])

  function handleReverseRoad() {
    setIsReverse(!isReverse)
    if (isReverse) {
      const temp = originRef.current.value;
      originRef.current.value = destiantionRef.current.value;
      destiantionRef.current.value = temp;
    } else {
      const temp = destiantionRef.current.value;
      destiantionRef.current.value = originRef.current.value;
      originRef.current.value = temp;
    }
  }
  useEffect(() => {


    return () => {

    }
  }, [])

  if (!isLoaded) {
    return <>
      <Box padding='6' boxShadow='lg' bg='white'>
        <Flex gap={10} flexWrap>
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
        </Flex>
        <SkeletonText mt='4' noOfLines={33} spacing='4' skeletonHeight='2' />
        <Flex gap={10} flexWrap>
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
          <SkeletonCircle size='10' />
        </Flex>
      </Box>
    </>;
  }
  return (
    <Flex position="relative" flexDirection="column" alignItems="center" h="100vh" w="100vw">
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={18}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: true,
            gestureHandling: 'greedy'
          }}
          onLoad={(map) => setMap(map)}>
          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </Box>
      <Flex flexDirection='column' p={4} px={12} borderRadius="lg" m={4} mt={0} bgColor="white" shadow="base" minW={'60%'} zIndex="1" gap={4} className='relative'>
        <HStack spacing={4} justifyContent="space-between">
          <Box flexGrow={3}>
            <Autocomplete
              onPlaceChanged={handleOriginPlaceChanged}
              // onLoad={handleOriginPlaceChanged}
              options={{
                componentRestrictions: { country: 'VN' } // Set the country restriction to Vietnam
              }}>
              <Input type="text" placeholder="Origin" ref={originRef}
                onChange={(e) => {
                  if (!e.target.value) {
                    setIsSearch(false);
                  }
                }} />
            </Autocomplete>
          </Box>
        </HStack>
        <HStack spacing={4} mt={1} justifyContent="space-between">
          {isSearch && <>
            <Box flexGrow={1}>
              <Autocomplete onPlaceChanged={() => {
                dispatch(setDestination(destiantionRef.current.value))
              }}>
                <Input type="text" placeholder="Destination" ref={destiantionRef} />
              </Autocomplete>
            </Box>
            <ButtonGroup>
              <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
                Calc
              </Button>
              <IconButton aria-label="center back" icon={<FaTimes />} onClick={clearRoute} />
            </ButtonGroup>
          </>}
        </HStack>
        <HStack spacing={4} justifyContent="space-between">
          <Box className="relative">
            <FaDirections size={'30px'} color="#1a73e8" className="cursor-pointer hover:fill-[#1b5fb8] transition-all" onClick={handleBackToMap} />
            <span className="absolute invisible">Helo</span>
          </Box>
          <Text flexGrow={1}>Distance: {distance} </Text>
          <Text flexGrow={1}>Duration: {duration} </Text>
          <Box flexGrow={1}>
            <Select value={transportationMode} onChange={(e) => setTransportationMode(e.target.value)}>
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Bicycling</option>
              <option value="TRANSIT">Transit</option>
            </Select>
          </Box>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(18);
            }}
          />
        </HStack>
        <div className="flex flex-col items-center gap-1 absolute top-7 left-[12px]">
          {/* I want a circle dot here */}
          <FaMapMarkerAlt size={'20px'} className='text-rose-500 hover:text-[#00B14F] transition-all cursor-pointer -translate-y-[1.5px]' />

          {/* I want a three veritcal dots here */}
          {isSearch && <div className="flex flex-col gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>}

          {/* I want a circle white here */}
          {isSearch && <FaCircle size={'15px'} className='text-white border-black border-[1.5px] mt-[2px] rounded-full hover:text-[#00B14F] transition-all cursor-pointer' />}
        </div>
        <div className="flex flex-col items-center gap-1 absolute top-16 right-[12px]" onClick={handleReverseRoad}>
          {/* I want a reverse icon here */}
          <FaExchangeAlt size={'20px'} className='rotate-90 text-rose-500 hover:text-[#00B14F] transition-all cursor-pointer -translate-y-[1.5px]' />

          {/* I want a three veritcal dots here */}
        </div>
      </Flex>
    </Flex>
  );
}

export default Map;
