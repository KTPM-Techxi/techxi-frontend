import React from 'react';
import { Navbar, Collapse, Typography, IconButton } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faList, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavList() {
  return (
    <ul className="justify-between my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <div className="flex item-left col-span-3 lg:col-span-1">
        <img className="mr-2 mt-1 h-8 w-auto" src="https://companieslogo.com/img/orig/GRAB-e42c2148.png?t=1643541585" alt="Your Company" />
        <Link to={'/'} as="a" variant="h6" className="mr-4 cursor-pointer py-1.5 text-[#00B14F] font-bold text-lg">
          Call Center
        </Link>
      </div>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
        <Link to={'/requests'} className="flex items-center hover:text-[#00B14F] text-black">
          <FontAwesomeIcon icon={faList} className="mr-1" />
          Request List
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
        <a href="#" className="flex items-center hover:text-[#00B14F] text-black">
          <FontAwesomeIcon icon={faUser} className="mr-1" />
          Users Management
        </a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
        <a href="#" className="flex items-center hover:text-[#00B14F] text-black">
          <FontAwesomeIcon icon={faStar} className="mr-1" />
          Ratings
        </a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
        <Link to={'/login'} className="flex items-center hover:text-[#00B14F] text-black">
          <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-1" />
          Log out
        </Link>
      </Typography>
    </ul>
  );
}

export default function NavigationBar() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 py-3 bg-[#00B14F]">
      <Navbar className="mx-auto max-w-screen-xl px-3 py-2 rounded-full bg-white">
        <div className="items-center justify-between text-blue-gray-900">
          <div className="hidden lg:block">
            <NavList />
          </div>
        </div>
      </Navbar>
    </div>
  );
}
