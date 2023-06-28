import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

function NavList() {
    return (
      <ul className="justify-between my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a href="#" className="flex items-center hover:text-[#00B14F] text-black">
            Request List
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a href="#" className="flex items-center hover:text-[#00B14F] text-black">
            Users Management
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a href="#" className="flex items-center hover:text-[#00B14F] text-black">
            Ratings
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a href="#" className="flex items-center hover:text-[#00B14F] text-black">
            <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-1"/>
            Log out
          </a>
        </Typography>
      </ul>
    );
  }
 
export default function NavigationBar() {
  const [openNav, setOpenNav] = React.useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
  return (
    <Navbar className="mt-3 mx-auto max-w-screen-xl px-6 py-3 rounded-full">
      <div className="grid grid-cols-3 items-center justify-between text-blue-gray-900">
        <div className="flex item-left col-span-3 lg:col-span-1">
            <img
                            className="mr-2 h-10 w-auto"
                            src="https://companieslogo.com/img/orig/GRAB-e42c2148.png?t=1643541585"
                            alt="Your Company"
                        />
            <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 text-[#00B14F] font-bold text-lg"
            >
            Call Center
            </Typography>
        </div>
        <div className="col-span-3 lg:col-span-1"></div>
        <div className="hidden lg:block col-span-3 lg:col-span-1">
          <NavList />
        </div>
      </div>
    </Navbar>
  );
}