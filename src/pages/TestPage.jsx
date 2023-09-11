import { DatePicker, TimePicker } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TestPage = ({ events }) => {
  const [id, setId] = useState('');
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

  useEffect(() => {
    console.log('🚀 ~ Tai xe nhan ~ events:', events);
    if (events[events.length - 1] != null || events[events.length - 1] != undefined) {
      const rawId = events[events.length - 1]?.documentKey._id.id;
      let fullId = [];
      for (let i = 0; i < rawId.length; i++) {
        fullId.push(rawId[i]);
      }
      setId(generateMongoDBId(fullId));
      console.log('🚀 generateMongoDBId(fullId):', generateMongoDBId(fullId));
    }
  }, [events]);

  return (
    <div className="h-[100vh]">
      {/* <DatePicker showTime={{ format: 'HH:mm' }} onChange={handleDateTimeChange} /> */}
      <div className="">
        There is a new booking from <span className="font-bold">Nguyen Van A</span> at <span className="font-bold">12:00</span> on{' '}
      </div>
      <button className="bg-red-200 w-full text-red-50" onClick={acceptBooking}>
        Accept booking
      </button>
    </div>
  );
};
function generateMongoDBId(byteArray) {
  // Create a Uint8Array from the provided byteArray
  const binaryData = Uint8Array.from(byteArray);

  // Convert the binary data into a hexadecimal string
  const objectId = binaryData.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');

  return objectId;
}
export default TestPage;
