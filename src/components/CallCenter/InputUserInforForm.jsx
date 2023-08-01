import { DatePicker } from 'antd';
import { useForm } from 'react-hook-form';
import React from 'react';
import GoogleMapReact from 'google-map-react';
import Map from '../Map/Map';

const SimpleMap = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 12
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '30vh', width: '100%' }}>
      <Map />
    </div>
  );
};

const InputUserInforForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Input User Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <input id="name" {...register('name', { required: true })} type="text" autoComplete="name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B14F] sm:text-sm sm:leading-6 p-2" />
            {errors.name && <span className="text-red-500 text-sm">Please enter your name.</span>}
          </div>
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
            Phone Number
          </label>
          <div className="mt-2">
            <input
              id="phoneNumber"
              {...register('phoneNumber', {
                required: true,
                pattern: /^(\+?\d{1,4})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
              })}
              type="tel"
              autoComplete="tel"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B14F] sm:text-sm sm:leading-6 p-2"
            />
            {errors.phoneNumber?.type === 'required' && <span className="text-red-500 text-sm">Please enter your phone number.</span>}
            {errors.phoneNumber?.type === 'pattern' && <span className="text-red-500 text-sm">Please enter a valid phone number.</span>}
          </div>
        </div>

        <div>
          <label htmlFor="timeToPick" className="block text-sm font-medium leading-6 text-gray-900">
            Time to Pick
          </label>
          <div className="mt-2">
            <input id="timeToPick" {...register('timeToPick', { required: true })} type="datetime-local" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B14F] sm:text-sm sm:leading-6 p-2" />
            {/* <DatePicker showTime={{ format: 'HH:mm' }} {...register('dateTime', { required: 'Date and time are required' })} /> */}
            {errors.timeToPick && <span className="text-red-500 text-sm">Please enter the time to pick.</span>}
          </div>
        </div>

        <div>
          <label htmlFor="currentPlace" className="block text-sm font-medium leading-6 text-gray-900">
            Pick place
          </label>
          <div className="mt-2">
            {/* <input id="currentPlace" {...register('currentPlace', { required: true })} type="text" autoComplete="address-line1" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B14F] sm:text-sm sm:leading-6 p-2" />
            {errors.currentPlace && <span className="text-red-500 text-sm">Please enter your current place.</span>} */}
          </div>
        </div>

        {/* <div>
          <label htmlFor="destination" className="block text-sm font-medium leading-6 text-gray-900">
            Destination
          </label>
          <div className="mt-2">
            <input id="destination" {...register('destination', { required: true })} type="text" autoComplete="address-line2" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B14F] sm:text-sm sm:leading-6 p-2" />
            {errors.destination && <span className="text-red-500 text-sm">Please enter your destination.</span>}
          </div>
        </div> */}

        <div>
          <label htmlFor="vehicleType" className="block text-sm font-medium leading-6 text-gray-900">
            Vehicle Type
          </label>
          <div className="mt-2">
            <select id="vehicleType" {...register('vehicleType', { required: true })} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B14F] sm:text-sm sm:leading-6 p-2">
              <option value="">--Select Vehicle Type--</option>
              <option value="Car">Car</option>
              <option value="Motobike">Motobike</option>
            </select>
            {errors.vehicleType && <span className="text-red-500 text-sm">Please select a vehicle type.</span>}
          </div>
        </div>

        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-[#00B14F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#00B14F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B14F]">
            Find drivers nearby
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputUserInforForm;
