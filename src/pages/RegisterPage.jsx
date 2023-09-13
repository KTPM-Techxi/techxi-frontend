import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Select } from '@chakra-ui/react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Input, Space } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../app/reducers/authSlice';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

// End date picker setup
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [date, setDate] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (value) => {
    console.log('Selected Time: ', value);
    setDate(value);
  };
  async function handleRegister(data) {
    console.log(data);
    try {
      const response = await axios.post('/users/register', data, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        alert('Register successfully');
        navigate('/');
        dispatch(loginSuccess(data));
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message);
      } else {
        console.log('Register failed');
      }
    }
  }
  return (
    <div>
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://companieslogo.com/img/orig/GRAB-e42c2148.png?t=1643541585" alt="Your Company" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Let&apos;s create your new account !</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Your name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    {...register('name', {
                      required: true,
                      validate: {
                        minLength: (value) => value.length >= 1,
                        matchPattern: (value) => value.match(/^[A-Za-z]+$/i),
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B14F] sm:text-sm sm:leading-6 p-2"
                  />
                  {errors.name && <span className="text-red-500 text-sm">Please enter a valid name (e.g. Hoang Nhat Minh)</span>}
                </div>
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                  Your phone number
                </label>
                <div className="mt-2">
                  <input
                    id="phoneNumber"
                    type="tel"
                    {...register('phoneNumber', {
                      required: true,
                      pattern: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)?\d{4}$/,
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B14F] sm:text-sm sm:leading-6 p-2"
                  />
                  {errors.phoneNumber && <span className="text-red-500 text-sm">Please enter a valid phone number (e.g. 123-456-7890)</span>}
                </div>
              </div>
              <div className="role_dob flex items-center w-full">
                <div className="w-[50%]">
                  <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                    Your role
                  </label>
                  <div className="mt-2">
                    <Select
                      placeholder="Select role"
                      size="md"
                      style={{
                        width: '100%',
                        padding: '0.25rem 0.5rem',
                        outline: 'none',
                        fontSize: '.90rem',
                      }}
                      {...register('role', { required: true })}>
                      <option value="customer">Customer</option>
                      <option value="driver" onSelect>
                        Driver
                      </option>
                    </Select>
                  </div>
                </div>
                <div className="w-[50%]">
                  <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                    Your DOB
                  </label>
                  <div className="mt-2">
                    <Space direction="vertical" className="w-full" {...register('dob', { required: true })}>
                      <DatePicker
                        defaultValue={dayjs('2000/01/01', dateFormat)}
                        format={dateFormat}
                        size="large"
                        id="dob"
                        style={{
                          width: '100%',
                        }}
                        {...register('dob', { required: true })}
                        onChange={(value, dateString) => handleChange(dateString)}
                        onOk={(value) => handleChange(value)}
                      />
                    </Space>
                  </div>
                </div>
              </div>
              {role == 'driver' && (
                <div className="role_dob flex items-center w-full">
                  <div className="w-[50%]">
                    <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                      Your vehicle type
                    </label>
                    <div className="mt-2">
                      <Select
                        placeholder="Select vehicle"
                        size="md"
                        style={{
                          width: '100%',
                          padding: '0.25rem 0.5rem',
                          outline: 'none',
                          fontSize: '.90rem',
                        }}
                        {...register('vehicleType', { required: false })}>
                        <option value="CAR">CAR</option>
                        <option value="MOTORCYCLE">MOTORCYCLE</option>
                      </Select>
                    </div>
                  </div>
                  <div className="w-[50%]">
                    <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                      Your Vehicle Number
                    </label>
                    <div className="mt-2">
                      <input id="vehicleNumber" type="vehicleNumber" autoComplete="vehicleNumber" {...register('vehicleNumber', { required: false })} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B14F] sm:text-sm sm:leading-6 p-2" />
                    </div>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2">
                {errors.role && <span className="text-red-500 text-sm ">Role must be selected</span>}
                {errors.dob && <span className="text-red-500 text-sm ">Must select DOB</span>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input id="email" type="email" autoComplete="email" {...register('email', { required: true })} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B14F] sm:text-sm sm:leading-6 p-2" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-[#00B14F] hover:text-[#00B14F]">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input id="password" type="password" {...register('password', { required: true })} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00B14F] sm:text-sm sm:leading-6 outline-none p-2" />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-[#00B14F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#00B14F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B14F]">
                  Create
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member ? &nbsp;
              <Link to="/login" className="font-semibold leading-6 text-[#00B14F] hover:text-[#00B14F]">
                Login to your account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
