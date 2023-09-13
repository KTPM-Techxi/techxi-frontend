import { DatePicker, Skeleton, TimePicker } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { generateMongoDBId } from '../../utils/helpers';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import ReusableMap from '../components/ReuseableMap';
import Map from '../components/Map/Map';
import ThreeDots from '../components/Map/components/ThreeDots';
import { FaCircle, FaMapMarkerAlt } from 'react-icons/fa';
import SkeletonLoading from '../components/SkeletonLoading';

const Driver = ({ events }) => {
  const [id, setId] = useState('');
  const [list, setList] = useState([]);
  const [state, _setState] = useState({
    isOpen: false,
    bookingId: '',
    status: '',
    pickupTime: '',
    pickupLocation: {
      latitude: '',
      longitude: '',
    },
    destination: {
      latitude: '',
      longitude: '',
    },
    pickupAddress: '',
    destinationAddress: '',
    totalPrice: '',
    distance: '',
  });
  const setState = (obj) => {
    _setState((old) => ({ ...old, ...obj }));
  };
  const resetState = () => {
    _setState({
      isOpen: false,
      bookingId: '',
      status: '',
      pickupTime: '',
      pickupLocation: {
        latitude: '',
        longitude: '',
      },
      destination: {
        latitude: '',
        longitude: '',
      },
      pickupAddress: '',
      destinationAddress: '',
      totalPrice: '',
      distance: '',
    });
  };
  const [driverState, setDriverState] = useState({
    isAccept: false,
    isArrive: false,
    isStart: false,
    isFinish: false,
  });
  const [currentBooking, setCurrentBooking] = useState({});
  const currentUser = useSelector((state) => state.auth.storedUser);
  const handleDateTimeChange = (date, dateString) => {
    console.log('Selected Date and Time:', dateString);
  };
  const handleBooking = async (message) => {
    switch (message) {
      case 'ACCEPT': {
        setDriverState((old) => ({ ...old, isAccept: true }));
        break;
      }
      case 'COMPLETED': {
        setDriverState((old) => ({ ...old, isAccept: false, isFinish: true }));
        break;
      }
      case 'GOING': {
        setDriverState((old) => ({ ...old, isAccept: false, isStart: true }));
        break;
      }
      case 'DECLINE': {
        setDriverState((old) => ({ ...old, isAccept: false }));
        break;
      }
    }
    console.log('🚀 ~ Driver ~ currentUser:', currentUser);

    try {
      const res = await axios.post('/api/v1/callcenter/bookings/driver_response', {
        booking_id: id,
        driver_id: currentUser.user_id,
        message: message,
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

  const updateBooking = async (id, updatedFields, status = {}) => {
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
  const handleFinish = async () => {
    updateBooking(id, { status: 'COMPLETED' });
    resetState();
  };
  useEffect(() => {
    console.log('🚀 ~ Tai xe nhan ~ events:', events);
    let fullId = [];
    if (events[events.length - 1]?.operationType == 'insert') {
      setState({ isOpen: true });
    }
    if (events[events.length - 1] != null || events[events.length - 1] != undefined) {
      const rawId = events[events.length - 1]?.documentKey._id.id;
      for (let i = 0; i < rawId.length; i++) {
        fullId.push(rawId[i]);
      }
      // Driver của booking hiện tại
      setId(generateMongoDBId(fullId));
    }
    // Lấy toàn bộ request trên db và set vào List hiện tại
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
      <div className="">
        {id && (
          <>
            <div className="mx-auto">
              There is a new booking with ID <span className="font-bold">{id || 'null'}</span> on {/* {currB} */}
              <span className="font-bold">{dayjs(state?.pickupTime).format('DD-MM-YYYY hh:mm')}</span>
            </div>
            
          </>
        )}

        {!state?.isOpen && <SkeletonLoading text={'Looking for customer'} />}
        {state?.isOpen && (
          <div className="rounded-md bg-[#d4f8e4] p-4 mx-auto my-10 w-2/3 border-2 shadow-lg">
            <p className="font-bold text-xl">Tech Xi Driver 🔥 (BookingID: {state?.bookingId})</p>
            <div className="flex justify-between mt-2 mb-4">
              <div className="ava">
                <img src="https://picsum.photos/80/80" alt="" className="rounded-2xl object-contain" />
              </div>
              <div className="flex flex-col justify-between name">
                <div className="name font-bold text-xl mt-2"> Jonh Smith Doe</div>
                <div className="book text-[#00B14F] mb-2">{state?.status}</div>
              </div>
              <div className="flex flex-col gap-2 money km">
                <div className="money font-bold text-2xl">${state?.totalPrice}</div>

                <div className="km text-xl text-gray-">{state?.distance || '5.9 km'}</div>
              </div>
            </div>
            <div className="flex flex-col mx-5 relative border-2 border-slate-100 bg-white rounded-xl p-4 mb-4">
              <div className="pickup up border-b border-gray-400 py-4">
                <p className="text-gray-400 text-[20px]">Pickup point</p>
                <p className="text-gray-900 text-[22px] font-semibold text-ellipsis overflow-hidden truncate  text-sm">{state?.pickupAddress || 'Đại học khoa học tự nhiên'}</p>
              </div>
              <div className="pickup below py-4">
                <p className="text-gray-400 text-[20px]">Pickout point</p>
                <p className="text-gray-900 text-[22px] font-semibold truncate">{state?.destinationAddress || 'Đại học Sài Gòn'}</p>
                <p className="">Time: {dayjs(state?.pickupTime).format('DD-MM-YYYY hh:mm')}</p>
              </div>

              <div className="flex flex-col-reverse items-center gap-1 absolute top-[45px] -left-[26px]">
                <FaMapMarkerAlt size={'20px'} className="text-red-500 hover:text-[#00B14F] transition-all cursor-pointer -translate-y-[1.5px]" />

                {/* 3 cái nút màu xanh dương */}
                <div className={`flex flex-col gap-2 translate-y-1`}>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                {/* Nút address màu đỏ để focus */}
                <FaCircle size={'15px'} className="text-white border-black border-[1.5px] mt-[12px] rounded-full hover:text-[#00B14F] transition-all cursor-pointer" />
              </div>
            </div>
            <div className="btns mb-2 flex gap-x-2">
              <button onClick={() => updateBooking(id, { status: 'REJECTED' }, 'DECLINE')} className="w-1/3 flex-1 text-center p-4 rounded-xl text-[20px] bg-white border-[2px] border-[#00155F] cursor-pointer mx-2 active:scale-[.95] transition-all">
                Decline
              </button>
              <button
                onClick={() => handleBooking('ACCEPT')}
                className="flex-1 text-center p-4 rounded-xl text-white
             bg-[#00B14F] cursor-pointer mx-2 active:scale-[.95] transition-all text-[20px]">
                Accept
              </button>
            </div>
            <div className="btns mb-2 flex gap-x-2">
              <button onClick={() => updateBooking(id, { status: 'GOING' })} className="flex-1 text-center p-4 rounded-xl text-[20px] bg-white border-[2px] border-[#00155F] cursor-pointer mx-2 active:scale-[.95] transition-all">
                Pick Up
              </button>
              <button
                onClick={() => handleFinish()}
                className="flex-1 text-center p-4 rounded-xl text-white
             bg-[#00B14F] cursor-pointer mx-2 active:scale-[.95] transition-all text-[20px]">
                Complete
              </button>
            </div>
            <div className="btns flex gap-x-2">
              <button onClick={() => _setState({ isOpen: false })} className="flex-1 text-center p-4 rounded-xl text-[20px] bg-white border-[2px] border-[#00155F] cursor-pointer mx-2 active:scale-[.95] transition-all">
                Find new booking
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Driver;
