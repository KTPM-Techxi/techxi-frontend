import React from 'react';
export const HomePage = () => {
  return (
    <div className="relative h-50 w-full">
      <video className="w-full h-50 top-0 left-0 z-0" autoPlay muted loop>
        <source src="https://assets.grab.com/wp-content/uploads/media/videos/hero_banner_singapore_q50_mobile.webm" type="video/mp4" />
      </video>
      <div className='h-30 w-100 bg-white border'></div> 
      <div className='h-30 w-100 bg-white border'></div> 
    </div>
  );
};