import { DatePicker, TimePicker } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { generateMongoDBId } from '../../utils/helpers';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import ReusableMap from '../components/ReuseableMap';

const Driver = ({ events }) => {
  const [id, setId] = useState('');
  const [list, setList] = useState([]);
  const [state, setState] = useState({
    booking_id: '',
    customer_id: '',
    driver_id: '',
    message: '',
  });
  const currentUser = useSelector((state) => state.auth.storedUser);
  const handleDateTimeChange = (date, dateString) => {
    console.log('Selected Date and Time:', dateString);
  };
  const acceptBooking = async () => {
    try {
      const res = await axios.post('/api/v1/callcenter/bookings/driver_response', {
        booking_id: id,
        driver_id: currentUser.user_id,
        message: 'ACCEPT',
      });
      console.log('🚀 ~ acceptBooking ~ res:', res);
    } catch (error) {
      console.log(error);
    }
  };

  const notifyUser = async () => {
    try {
      const res = await axios.post('/api/v1/callcenter/bookings/driver_response', {
        booking_id: id,
        driver_id: currentUser.user_id,
        message: 'ACCEPT',
      });
      console.log('🚀 ~ acceptBooking ~ res:', res);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBooking = async (id, updatedFields) => {
    const res = await axios.post(`/api/v1/callcenter/bookings/update?booking_id=${id}`, updatedFields);
    console.log('updateBooking', res);

    return res.data;
  };

  const getAllRequests = async () => {
    const res = await axios.get(`/api/v1/callcenter/bookings/filter`, {
      withCredentials: true,
    });
    console.log('list from server', res?.bookings);
    setList(res.data?.bookings);
    return res.data;
  };
  const navigateToMap = () => {
    // window.location.href = `https://www.google.com/maps/dir/?api=1&destination=10.762622,106.660172&travelmode=driving`;
  };
  useEffect(() => {
    console.log('🚀 ~ Tai xe nhan ~ events:', events);
    let fullId = [];
    if (events[events.length - 1] != null || events[events.length - 1] != undefined) {
      const rawId = events[events.length - 1]?.documentKey._id.id;
      for (let i = 0; i < rawId.length; i++) {
        fullId.push(rawId[i]);
      }
      setId(generateMongoDBId(fullId));
      console.log('🚀 generateMongoDBId(fullId):', generateMongoDBId(fullId));
    }
    getAllRequests();
    const currentBookingForDriver = list.find((item) => item.bookingId == generateMongoDBId(fullId));
    setState(currentBookingForDriver);
    console.log('🚀 ~ Tai xe nhan ~ currentBookingForDriver:', state);
  }, [events]);

  useEffect(() => {
    console.log('🚀 ~ Tai xe nhan ~ state:', state);
  }, [state]);

  return (
    <>
      <div className="h-[100vh]">
        {/* <DatePicker showTime={{ format: 'HH:mm' }} onChange={handleDateTimeChange} /> */}
        <div className="">
          There is a new booking with ID <span className="font-bold">{id || 'null'}</span> on {/* {currB} */}
          <span className="font-bold">{dayjs(state?.pickupTime).format('DD-MM-YYYY hh:mm')}</span>
        </div>
        <button className="bg-red-200 w-full text-red-50" onClick={acceptBooking}>
          Accept booking
        </button>
        <button className="bg-red-200 w-full text-red-50" onClick={() => updateBooking(id, { status: 'COMPLETED', total_distance: '12m' })}>
          Arrive at pickup location
        </button>
        <Link to={'https://www.google.com/maps/dir/?api=1&destination=10.762622,106.660172&travelmode=driving'} className="bg-red-200 w-full text-red-50">
          Navigate to map
        </Link>
        <ReusableMap long={12} lat={13} />
      </div>
    </>
  );
};

export default Driver;
