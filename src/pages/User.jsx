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
import './user.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCar} from '@fortawesome/free-solid-svg-icons';

const center = { lat: 10.762831, lng: 106.682476 };

function handleBackToMap(map, center) {
  map.panTo(center);
  map.setZoom(18);
}
const User = ({ user,events }) => {
  const [isCentreModalOpen, setIsCentreModalOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.storedUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openCentreModal = () => {
    setIsCentreModalOpen(true);
    setIsModalOpen(false);
  };
  const closeCentreModal = () => {
    setIsCentreModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      // customer_id: currentUser.user_id,
      driver_vehicle_type: transportationModeStore,
      // customer_name: name,
      // customer_phone_number: phoneNumber,
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
    const response = await axios.post('/api/v1/customer/bookings/request', data, {
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

  const [driverId, setDriverID] = useState('');
  const [status, setStatus] = useState('');
  const [selectedStar, setSelectedStar] = useState(null);

  const handleStarClick = (star) => {
    setSelectedStar(star);
  };
  useEffect(() => {
    console.log('🚀 events:', events);
    console.log('user:', currentUser.user_id);
    if (currentUser.user_id === events[0]?.fullDocument?.customer_id) {
      setStatus(events.slice(-1)[0]?.fullDocument?.status);
      setDriverID(events.slice(-1)[0]?.fullDocument?.driver_id);
    }
  }, [events, currentUser]);
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
      <button onClick={openModal} className="absolute z-[50] left-[5px] -top-[-60px] bg-white text-black border-2 rounded-xl font-semibold py-2 px-2">
        {' '}
        <FontAwesomeIcon icon={faBook} className="mx-1" /> Book A Ride{' '}
      </button>
      <button onClick={openCentreModal} className="absolute z-[50] left-[5px] -top-[-110px]  bg-white text-black border-2 rounded-xl font-semibold px-2 py-2">
        {' '}
        <FontAwesomeIcon icon={faCar} className="mx-1" /> Nearby Driver{' '}
      </button>
      {isModalOpen && (
        <Flex flexDirection="column" p={4} px={12} borderRadius="lg" m={4} mt={20} bgColor="white" shadow="base" minW={'60%'} zIndex="99" gap={4} className="relative transition-all" opacity={state.isModalOpen ? '1' : '0'} visibility={state.isModalOpen ? 'visible' : 'hidden'}>
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
      )}
      {/* Second Modal */}
      {isCentreModalOpen && status === 'PENDING' && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 p-4 rounded-lg shadow-lg">
            {/* Content of the second modal */}
            <div className="flex">
              <h2 className="text-md font-semibold mb-4">We are looking for a nearby driver</h2>
              <div className="searching-dots mb-2">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
            {/* Button to close the second modal */}
            <div className="justify-between flex">
              <div></div>
              <button onClick={closeCentreModal} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isCentreModalOpen && status === 'RECEIVED' && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 p-4 rounded-lg shadow-lg">
            {/* Content of the second modal */}
            <div className="flex">
              <img className="w-10 h-10 rounded-full object-cover" src="https://flxt.tmsimg.com/assets/676946_v9_bb.jpg" alt="Jese image" />
              <div className="mt-2 flex mx-2">
                <h2 className="text-md font-semibold mb-4">{driverId}</h2>
                <h2 className="text-md ml-1">is 10km Away</h2>
              </div>
              <div className="searching-dots ">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
            {/* Button to close the second modal */}
            <div className="justify-between flex">
              <div></div>
              <button onClick={closeCentreModal} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isCentreModalOpen && status === 'COMPLETED' && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 p-4 rounded-lg shadow-lg">
            {/* Content of the second modal */}
            <div className="flex mx-auto">
              <h2 className="text-md font-semibold mx-auto">Thanks for your support</h2>
            </div>
            <div className="w-4/5 p-4 mx-auto">
              <input type="text" placeholder="Enter review here" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400" aria-rowspan={4} />

              {/* Five-Star Rating */}
              <div className="flex mt-4">
                <span className="text-md">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`text-3xl ml-2 cursor-pointer ${star <= selectedStar ? 'text-yellow-500' : 'text-gray-300'}`} onClick={() => handleStarClick(star)}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            {/* Button to close the second modal */}
            <div className="justify-between flex">
              <div></div>
              <button onClick={closeCentreModal} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Flex>
  );
}

export default User;
