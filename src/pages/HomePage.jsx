import React from 'react';

export const HomePage = () => {
    return (
      <div className="relative h-100">
        <video className="w-full h-full top-0 left-0 z-0" autoPlay muted loop>
          <source src="https://assets.grab.com/wp-content/uploads/media/videos/hero_banner_singapore_q50_mobile.webm" type="video/mp4" />
        </video>
        <div className="relative z-10">
          {/* Content */}
        </div>
      </div>
    );
  };