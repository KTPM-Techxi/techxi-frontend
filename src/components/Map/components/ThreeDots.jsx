import React from 'react';

const ThreeDots = ({ className }) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
    </div>
  );
};

export default ThreeDots;
