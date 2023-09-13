import { Box, Flex, HStack } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaCircle, FaExchangeAlt } from 'react-icons/fa';
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';
import ThreeDots from './Map/components/ThreeDots.jsx';
import SkeletonLoading from './SkeletonLoading.jsx';
const center = { lat: 10.762831, lng: 106.682476 };

function handleBackToMap(map, center) {
  map.panTo(center);
  map.setZoom(18);
}

function ReusableMap({ lat, lng }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places', 'geometry', 'geocoding', 'marker', 'geocoding'],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [transportationMode, setTransportationMode] = useState('DRIVING');
  const [state, _setState] = useState({
    isReverse: false,
    isSearch: false,
    isModalOpen: true,
    isShowCost: false,
  });
  const setState = (obj) => {
    _setState((old) => ({ ...old, ...obj }));
  };

  if (!isLoaded) return <SkeletonLoading />;
  return (
    <Flex position="relative" flexDirection="column" alignItems="center" h="100vh" w="100vw">
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={{ lat, lng } || center}
          zoom={18}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: true,
            gestureHandling: 'greedy',
          }}
          onLoad={() => setMap({ lat, lng })}>
          <Marker position={{ lat, lng } || center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </Box>
    </Flex>
  );
}

export default ReusableMap;
