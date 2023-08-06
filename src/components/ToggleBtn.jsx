import React, { useState } from 'react';

const ToggleBtn = ({ isModalOpen, setState, className, text }) => {
  const handleToggle = () => {
    setState({ isModalOpen: !isModalOpen });
  };
  return (
    <div className={`${className}`}>
      <label className={`relative inline-flex items-center cursor-pointer`}>
        <input type="checkbox" value="" className="sr-only peer" checked={isModalOpen} onChange={handleToggle}></input>
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600" />
        <span className="ml-3 text-sm font-medium text-gray-900 ">{text}</span>
      </label>
    </div>
  );
};

export default ToggleBtn;
