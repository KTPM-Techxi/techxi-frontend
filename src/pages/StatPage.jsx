import { useState } from 'react';
import InputUserInforForm from '../components/CallCenter/InputUserInforForm';

const StatPage = () => {
  return (
    <div className="w-4/5 mx-auto p-4 flex">
      <div className="w-2/3 mx-2 shadow-md">
        <div className='w-full flex justify-around bg-slate-100 p-3'>
            <div className='w-1/3 h-20 bg-white flex rounded-xl shadow-md'>
                <img className="p-2 ml-2 aspect-square" src="https://cdn-icons-png.flaticon.com/512/8922/8922324.png" alt="revenue" />
                <div className='my-auto ml-4'>
                    <div className='font-bold'>Total Revenue</div>
                    <div className='text-green-600'>$12300000</div>
                </div>
            </div>
            <div className='w-1/3 h-20 bg-white flex rounded-xl shadow-md mx-3'>
                <img className="p-2 ml-2 aspect-square" src="https://cdn-icons-png.flaticon.com/512/4088/4088042.png" alt="booking" />
                <div className='my-auto ml-4'>
                    <div className='font-bold'>Total Rides</div>
                    <div className='text-green-600'>365438</div>
                </div>
            </div>
            <div className='w-1/3 h-20 bg-white flex rounded-xl shadow-md'>
                <img className="p-2 ml-2 aspect-square" src="https://cdn-icons-png.flaticon.com/512/2898/2898588.png" alt="driver" />
                <div className='my-auto ml-4'>
                    <div className='font-bold'>Total Drivers</div>
                    <div className='text-green-600'>1209</div>
                </div>
            </div>
        </div>

        <div>
            
        </div>
      </div>
      <div className='w-1/3 border-2 border-gray-400 ml-2'>

      </div>
    </div>
  );
};

export default StatPage;
