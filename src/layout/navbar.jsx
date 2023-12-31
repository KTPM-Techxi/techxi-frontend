import React, { useState } from 'react';
import { Navbar, Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faExternalLinkAlt, faList, faStar, faTaxi, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../app/reducers/authSlice';
import axios from 'axios';
import { useEffect } from 'react';
function NavList({ handleLogout }) {
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.storedUser);
  const [role, setRole] = useState('');
  useEffect(() => {
    const getRole = async () => {
      try {
        const res = await axios.post(`/api/v1/callcenter/users/details`, {
          "userId": currentUser.user_id,
          "role" : "driver"
        })
        console.log(res?.data);
        setRole(res?.data?.userInfo?.role);
        console.log(role)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getRole();
    },  [currentUser]);
    if (role === 'customer'){
      return (
        <ul className="justify-between my-1 flex flex-row gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
          <div className="flex item-left col-span-3 lg:col-span-1">
            <img className="mr-2 mt-1 h-8 w-auto" src="https://companieslogo.com/img/orig/GRAB-e42c2148.png?t=1643541585" alt="Your Company" />
            <Link to={'/'} as="a" variant="h6" className="mr-4 cursor-pointer py-1.5 text-[#00B14F] font-bold text-lg">
              Welcome
            </Link>
          </div>
          <Typography as="li" variant="small" color="blue-gray" className="p-1 my-auto font-medium">
            <Link to={'/user'} className="flex items-center hover:text-[#00B14F] text-black">
              <FontAwesomeIcon icon={faTaxi} className="mr-1" />
              Book A Ride Now
            </Link>
          </Typography>
          <Typography as="li" variant="small" color="blue-gray" className="p-1 my-auto font-medium">
            {!isUserLoggedIn ? (
              <Link to={'/login'} className="flex items-center hover:text-[#00B14F] text-black">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-1" />
                Login
              </Link>
            ) : (
              <button onClick={handleLogout} className="flex items-center hover:text-[#00B14F] text-black">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-1" />
                Log out
              </button>
            )}
          </Typography>
        </ul>
      );
    }
    else if (role === 'driver')
    {
      return (
        <ul className="justify-between my-1 flex flex-row gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
          <div className="flex item-left col-span-3 lg:col-span-1">
            <img className="mr-2 mt-1 h-8 w-auto" src="https://companieslogo.com/img/orig/GRAB-e42c2148.png?t=1643541585" alt="Your Company" />
            <Link to={'/'} as="a" variant="h6" className="mr-4 cursor-pointer py-1.5 text-[#00B14F] font-bold text-lg">
              Welcome
            </Link>
          </div>
          <Typography as="li" variant="small" color="blue-gray" className="p-1 my-auto font-medium">
            <Link to={'/driver'} href="#" className="flex items-center hover:text-[#00B14F] text-black">
              <FontAwesomeIcon icon={faUser} className="mr-1" />
              Fetching Customers
            </Link>
          </Typography>
          <Typography as="li" variant="small" color="blue-gray" className="p-1 my-auto font-medium">
            {!isUserLoggedIn ? (
              <Link to={'/login'} className="flex items-center hover:text-[#00B14F] text-black">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-1" />
                Login
              </Link>
            ) : (
              <button onClick={handleLogout} className="flex items-center hover:text-[#00B14F] text-black">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-1" />
                Log out
              </button>
            )}
          </Typography>
        </ul>
      );
    }
    else {
      return (
        <ul className="justify-between my-1 flex flex-row gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
          <div className="flex item-left col-span-3 lg:col-span-1">
            <img className="mr-2 mt-1 h-8 w-auto" src="https://companieslogo.com/img/orig/GRAB-e42c2148.png?t=1643541585" alt="Your Company" />
            <Link to={'/'} as="a" variant="h6" className="mr-4 cursor-pointer py-1.5 text-[#00B14F] font-bold text-lg">
              Call Center
            </Link>
          </div>
          <Typography as="li" variant="small" color="blue-gray" className="p-1 my-auto font-medium">
            <Link to={'/requests'} className="flex items-center hover:text-[#00B14F] text-black">
              <FontAwesomeIcon icon={faList} className="mr-1" />
              Request List
            </Link>
          </Typography>
          <Typography as="li" variant="small" color="blue-gray" className="p-1 my-auto font-medium">
            <Link to={'/userlist'} href="#" className="flex items-center hover:text-[#00B14F] text-black">
              <FontAwesomeIcon icon={faUser} className="mr-1" />
              Users Management
            </Link>
          </Typography>
          <Typography as="li" variant="small" color="blue-gray" className="p-1 my-auto font-medium">
            <a href="/statistics" className="flex items-center hover:text-[#00B14F] text-black">
              <FontAwesomeIcon icon={faChartColumn} className="mr-1" />
              Statistics
            </a>
          </Typography>
          <Typography as="li" variant="small" color="blue-gray" className="p-1 my-auto font-medium">
            {!isUserLoggedIn ? (
              <Link to={'/login'} className="flex items-center hover:text-[#00B14F] text-black">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-1" />
                Login
              </Link>
            ) : (
              <button onClick={handleLogout} className="flex items-center hover:text-[#00B14F] text-black">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-1" />
                Log out
              </button>
            )}
          </Typography>
        </ul>
      );
    }
}

export default function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout(e) {
    e.preventDefault();
    try {
      await axios.post('/users/logout', {
        withCredentials: true,
      });
      localStorage.removeItem('user');
      dispatch(logoutSuccess());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const handleWindowResize = () => window.innerWidth >= 960;

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 py-3 bg-[#00B14F]">
      <Navbar className="mx-auto max-w-screen-xl px-3 py-2 rounded-full bg-white">
        <div className="items-center  justify-between  text-blue-gray-900">
          <NavList handleLogout={handleLogout} />
        </div>
      </Navbar>
    </div>
  );
}
