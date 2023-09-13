import { DatePicker, TimePicker } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const User = ({ events }) => {
  const acceptBooking = async () => {};

  useEffect(() => {}, [events]);

  return (
    <div className="h-[100vh]">
      <div className="">
        There is a new driver name <span className="font-bold">Nguyen Van A</span> is coming for you <span className="font-bold">12:00</span> on{' '}
      </div>
      <button className="bg-red-200 w-full text-red-50" onClick={acceptBooking}>
        Cancel Booking
      </button>
    </div>
  );
};

export default User;
