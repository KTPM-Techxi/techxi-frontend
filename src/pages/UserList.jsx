import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCab, faCar, faDriversLicense, faEye, faGear, faList, faMotorcycle, faPen, faStar, faTrash, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect } from 'react';
import RandomImage from '../components/randomImage';
export const UserList = () => {
    const [selectedOption, setSelectedOption] = useState('driver'); // Default selected option is 'customer'
    const [driverList, setDriverList] = useState([]);
    const [cusList, setCusList] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(`/api/v1/callcenter/users/filter?roles=driver&current_page=1&page_size=10`, {
        });
        console.log(res.data.users);
        setDriverList(res.data?.users);
        const res_ = await axios.get(`/api/v1/callcenter/users/filter?roles=customer&current_page=1&page_size=10`, {
        });
        console.log(res_.data.users);
        setCusList(res_.data?.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllUsers(); // Call the function when the component mounts

    // Optionally, you can also set the selected option here or in another useEffect

  }, []); // Empty dependency array ensures this effect runs once
    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };
    return (
        <div>
            <div className="mt-5 w-4/5 mx-auto flex">
                <form className='flex-2 w-2/3'>
                    <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none" placeholder="Search Names, Phone Numbers, ..." required />
                        <button type="submit" className="bg-[#00B14F] text-white absolute right-2.5 bottom-2.5 hover:bg-[#009e3d] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
                <span className="inline-grid items-center grid-cols-2 ml-2">
                <span>
                    <button
                    className={`${
                        selectedOption === 'customer'
                        ? 'bg-[#00B14F] text-white'
                        : 'hover:bg-gray-100 text-gray-800'
                    } text-sm font-semibold py-2 px-2 border border-gray-400 rounded shadow mx-2`}
                    onClick={() => handleOptionChange('customer')}
                    >
                    <FontAwesomeIcon
                        icon={faUserGroup}
                        className={selectedOption === 'customer' ? 'text-white' : 'text-[#00B12F]'}
                    />{' '}
                    Customer
                    </button>
                </span>
                <span>
                    <button
                    className={`${
                        selectedOption === 'driver'
                        ? 'bg-[#00B14F] text-white'
                        : 'hover:bg-gray-100 text-gray-800'
                    } text-center text-sm font-semibold py-2 px-2 border border-gray-400 rounded shadow mx-2`}
                    onClick={() => handleOptionChange('driver')}
                    >
                    <FontAwesomeIcon
                        icon={faCab}
                        className={selectedOption === 'driver' ? 'text-white' : 'text-[#00B12F]'}
                    />{' '}
                    Driver
                    </button>
                </span>
                </span>


                <div className='flex-1 flex justify-end items-center'>
                    <button className="bg-[#00B14F] hover:bg-[#009e3d] text-white text-sm font-semibold py-2 px-2 border border-gray-400 rounded shadow mx-2">
                        Add User
                    </button>
                </div>

            </div>
            <div className="relative max-h-[400px] overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg w-4/5 mx-auto mt-5">
                {selectedOption === 'customer' ? (
                    <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 ">
                            <tr>
                                <th scope="col-2" className="px-6 py-3 text-center">
                                    Customer Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    DOB
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {driverList.map((customer) => (
                                <tr key={customer.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="flex px-6 py-2 justify-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <RandomImage />
                                    <div className="px-2 py-2">{customer.name}</div>
                                </th>
                                <td className="px-6 py-4 text-center">{customer.address}</td>
                                <td className="px-6 py-4 text-center">
                                    {customer.email} 
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {customer.dob}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <a className=""><FontAwesomeIcon icon={faPen} className="text-lg text-[#00B17F] mr-10" /></a>
                                    <a className=""><FontAwesomeIcon icon={faTrash} className="text-lg text-red-500" /></a>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 ">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Driver Name
                                </th>
                                <th scope="col-2" className="px-6 py-3 text-center">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Vehicle
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Vehicle ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Rating
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cusList.map((customer) => (
                                <tr key={customer.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="flex px-6 py-2 justify-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <RandomImage />
                                    <div className="px-2 py-2">{customer.name}</div>
                                </th>
                                <td className="px-6 py-4 text-center">{customer.email}</td>
                                <td className="px-6 py-4 text-center">
                                    <FontAwesomeIcon icon={faCar} className="text-[#00B12F]" /> 
                                </td>
                                <td className="px-6 py-4 text-center">{customer.dob}</td>
                                <td className="px-6 py-4 text-center">
                                    <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <a className=""><FontAwesomeIcon icon={faPen} className="text-lg text-[#00B17F] mr-10" /></a>
                                    <a className=""><FontAwesomeIcon icon={faTrash} className="text-lg text-red-500" /></a>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>
        </div>
    )
};
