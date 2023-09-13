import { Box, Button, ButtonGroup, Flex, HStack, IconButton, Input, SkeletonText, Text, Select, Textarea, Stack, SkeletonCircle } from '@chakra-ui/react';
import { FaLocationArrow, FaTimes, FaDirections, FaMapMarkerAlt, FaCircle, FaExchangeAlt, FaToggleOff, FaToggleOn, FaMoneyBillAlt } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import { TbMapPinSearch } from 'react-icons/tb';
import { TbSquareToggleHorizontal } from 'react-icons/tb';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCost, setDestination, setOrigin, setTransportationMode as setTransportationModeStore, setDistance as setDistanceStore, setDuration as setDurationStore, setParsedAdress } from '../components/Map/mapSlice.js';
import { useLocation } from 'react-router-dom';
import Numeral from 'react-numeral';
import axios from 'axios';
import dayjs from 'dayjs';
import ThreeDots from '../components/Map/components/ThreeDots';
import DestinationSearchBox from '../components/Map/components/DestinationSearchBox';
import Costs from '../components/Map/components/Costs';
import FinalCalculation from '../components/Map/components/FinalCalculation';
import OriginSearchBox from '../components/Map/components/OriginSearchBox';
import SkeletonLoading from '../components/SkeletonLoading';
import ToggleBtn from '../components/ToggleBtn';
import { calCulateFees } from '../../utils/helpers';
const center = { lat: 10.762831, lng: 106.682476 };

function handleBackToMap(map, center) {
  map.panTo(center);
  map.setZoom(18);
}

function User() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places', 'geometry', 'geocoding', 'marker', 'geocoding'],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
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
  const originRef = useRef(null);
  const destiantionRef = useRef(null);
  const dispatch = useDispatch();
  const originStore = useSelector((state) => state.map.origin);
  const destinationStore = useSelector((state) => state.map.destination);
  const distanceStore = useSelector((state) => state.map.distance);
  const durationStore = useSelector((state) => state.map.duration);
  const transportationModeStore = useSelector((state) => state.map.transportationMode);
  const costStore = useSelector((state) => state.map.cost);
  const parsedAddress = useSelector((state) => state.map.parsedAdress);
  // Get the state from the location object
  const { state: UserFormInputInfor } = useLocation();
  const currentUserInfor = useSelector((state) => state.currentUserInfor.infor);

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }
    setState({ isShowCost: true });
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode[transportationModeStore ? transportationModeStore : 'TWO_WHEELER'],
      // eslint-disable-next-line no-undef
      unitSystem: google.maps.UnitSystem.METRIC,
      language: 'vi',
      region: 'VN',
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    dispatchAll();
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destiantionRef.current.value = '';
    setState({ isSearch: false });
  }
  function handleFocus(refToFocus) {
    refToFocus.current.focus();
  }
  function handleOriginPlaceChanged() {
    const place = originRef.current.value.toString();
    console.log('origin place changes', place);
    if (!place) return;
    else setState({ isSearch: true });
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: place }, (results, status) => {
      const location = results[0].geometry.location;
      dispatch(setParsedAdress({ originLat: location.lat(), originlng: location.lng() }));
      if (status === 'OK' && results && results.length > 0) {
        map.panTo({ lat: location.lat(), lng: location.lng() });
        map.setZoom(15);
        dispatch(setOrigin({ place }));
      } else {
        console.error('Geocoder failed due to: ', status);
      }
    });
  }
  function handleDestinationPlaceChanged() {
    const place = destiantionRef.current.value.toString();
    console.log('destination place changes', place);
    if (!place) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: place }, (results, status) => {
      const location = results[0].geometry.location;
      dispatch(setParsedAdress({ destinationLat: location.lat(), destinationlng: location.lng() }));
      if (status === 'OK' && results && results.length > 0) {
        map.panTo({ lat: location.lat(), lng: location.lng() });
        map.setZoom(15);
        calculateRoute();
        dispatch(setDestination({ place }));
      } else {
        console.error('Geocoder failed due to: ', status);
      }
    });
  }

  async function handleReverseRoad() {
    setState({ isReverse: !state.isReverse });
    if (state.isReverse) {
      const temp = originRef.current.value;
      originRef.current.value = destiantionRef.current.value;
      destiantionRef.current.value = temp;
    } else {
      const temp = destiantionRef.current.value;
      destiantionRef.current.value = originRef.current.value;
      originRef.current.value = temp;
    }
    await calculateRoute();
  }
  const dispatchAll = () => {
    dispatch(setCost(calCulateFees(+distance.split('')[0], +duration.split('')[0], 100000, 100000, 10000)));
    dispatch(setOrigin(destiantionRef.current.value));
    dispatch(setDestination(originRef.current.value));
    dispatch(setOrigin(originRef.current.value));
    dispatch(setDestination(destiantionRef.current.value));
    dispatch(setDistanceStore(distance));
    dispatch(setDurationStore(duration));
  };
  function handleFindDrivers() {
    // TODO: Find drivers
    console.log('handleFindDrivers currentUserInfor', currentUserInfor);
    console.log('handleFindDrivers UserFormInputInfor', UserFormInputInfor);
    dispatch(setCost(calCulateFees(+distance.split('')[0], +duration.split('')[0], 100000, 100000, 10000)));
    dispatch(setOrigin(destiantionRef.current.value));
    dispatch(setDestination(originRef.current.value));
    dispatch(setOrigin(originRef.current.value));
    dispatch(setDestination(destiantionRef.current.value));
    dispatch(setDistanceStore(distance));
    dispatch(setDurationStore(duration));
    // dispatch(setTransportationModeStore(transportationMode));
    //   {
    //     "data": {
    //         "name": "Duc An",
    //         "phoneNumber": "0935555555",
    //         "timeToPick": "2023-09-01T12:12",
    //         "vehicleType": "Car"
    //     },
    //     "destinationStore": {
    //         "place": "Đại học Kinh tế TP.HCM - UEH, Nguyễn Đình Chiểu, Vo Thi Sau Ward, District 3, Ho Chi Minh City, Vietnam"
    //     },
    //     "originStore": {
    //         "place": "Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM, Đường Nguyễn Văn Cừ, Phường 4, District 5, Ho Chi Minh City, Vietnam"
    //     },
    //     "distanceStore": "668 km",
    //     "durationStore": "12 giờ 9 phút",
    //     "transportationModeStore": "DRIVING",
    //     "costStore": 710000
    // }
    const { name, phoneNumber, timeToPick, vehicleType } = currentUserInfor;
    const data = {
      // agent_id: 'AnIDAgent',
      driver_vehicle_type: transportationModeStore,
      customer_name: name,
      customer_phone_number: phoneNumber,
      pickup_time: timeToPick,
      pickup_location: {
        latitude: parsedAddress.originLat,
        longtitude: parsedAddress.originlng,
      },
      destination: {
        latitude: parsedAddress.destinationLat,
        longtitude: parsedAddress.destinationlng,
      },
      time_completion: durationStore,
      scheduled_time: durationStore,

      total_distance: distanceStore,
      total_price: costStore,
    };
    console.log('🚀 ~ file: Map.jsx:170 ~ handleFindDrivers ~ data:', data);
    sendBookingRequest(data);
  }
  const sendBookingRequest = async (data) => {
    const response = await axios.post('/api/v1/callcenter/bookings/create', data, {
      withCredentials: true,
    });
    console.log('🚀 ~ sendBookingRequest ~ response:', response);
  };
  useEffect(() => {
    console.log('destinationStore changed', originStore);
    console.log('destinationStore changed', destinationStore);
    console.log('parsedAddress changed', parsedAddress);
  }, [originStore, destinationStore, parsedAddress]);

  useEffect(() => {
    console.log('🚀 CostsStore:', costStore);
    console.log('🚀 originStore:', originStore);
    console.log('🚀 destinationStore:', destinationStore);
    console.log('🚀 distanceStore:', distanceStore);
    console.log('🚀 durationStore:', durationStore);
    console.log('🚀 transportationModeStore:', transportationModeStore);
  }, [costStore, originStore, destinationStore, distanceStore, durationStore, transportationModeStore]);

  useEffect(() => {
    console.log('useEffect', UserFormInputInfor, 'and', currentUserInfor);
  }, [currentUserInfor, UserFormInputInfor]);

  if (!isLoaded) {
    return <SkeletonLoading />;
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
            gestureHandling: 'greedy',
          }}
          onLoad={(map) => setMap(map)}>
          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </Box>
      {/* Nút hiển thị bật tắt Modal */}
      <ToggleBtn isModalOpen={state.isModalOpen} setState={setState} className="absolute z-[50] left-[7px] -top-[15px] " text={''} />

      <Flex flexDirection="column" p={4} px={12} borderRadius="lg" m={4} mt={100} bgColor="white" shadow="base" minW={'60%'} zIndex="99" gap={4} className="relative transition-all" opacity={state.isModalOpen ? '1' : '0'} visibility={state.isModalOpen ? 'visible' : 'hidden'}>
        {/* Hiển thị Search Box Số 1 */}
        <HStack spacing={4} justifyContent="space-between">
          <OriginSearchBox setState={setState} handleOriginPlaceChanged={handleOriginPlaceChanged} originRef={originRef} />
        </HStack>
        {/* Hiển thị Search Box số 2  */}
        <HStack spacing={4} mt={1} justifyContent="space-between">
          {state.isSearch && <DestinationSearchBox handleDestinationPlaceChanged={handleDestinationPlaceChanged} calculateRoute={calculateRoute} clearRoute={clearRoute} destiantionRef={destiantionRef} />}
        </HStack>
        {/* Hiển thị Distance, Duration và Loại Car Driving */}
        {/* Todo: Chọn Car Driving cho đúng */}
        <FinalCalculation map={map} distance={distance} duration={duration} handleBackToMap={handleBackToMap} />
        {/* Hiển thị giá tiền */}
        {state.isShowCost && <Costs map={map} handleBackToMap={handleBackToMap} distance={distance} duration={duration} handleFindDrivers={handleFindDrivers} />}

        <div className="flex flex-col items-center gap-1 absolute top-7 left-[12px]">
          <FaMapMarkerAlt size={'20px'} className="text-rose-500 hover:text-[#00B14F] transition-all cursor-pointer -translate-y-[1.5px]" onClick={() => handleFocus(originRef)} />

          {/* 3 cái nút màu xanh dương */}
          {state.isSearch && <ThreeDots />}

          {/* Nút address màu đỏ để focus */}
          {state.isSearch && <FaCircle size={'15px'} className="text-white border-black border-[1.5px] mt-[2px] rounded-full hover:text-[#00B14F] transition-all cursor-pointer" onClick={() => handleFocus(destiantionRef)} />}
        </div>

        {/* Nút Reverse màu đỏ */}
        {state.isSearch && (
          <div className="flex flex-col items-center gap-1 absolute top-16 right-[12px]" onClick={handleReverseRoad}>
            <FaExchangeAlt size={'20px'} className="rotate-90 text-rose-500 hover:text-[#00B14F] transition-all cursor-pointer -translate-y-[1.5px]" />
          </div>
        )}
      </Flex>
    </Flex>
  );
}

export default User;
