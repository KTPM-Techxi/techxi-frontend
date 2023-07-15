import React, { useEffect, useState } from 'react';
export const HomePage = () => {
  // states goes here
  const [isPlaying, setIsPlaying] = useState(true);

  // useEffect goes here
  useEffect(() => {
    if (isPlaying) {
      document.querySelector('video').play();
    } else {
      document.querySelector('video').pause();
    }
    return () => {};
  }, [isPlaying]);

  // functions goes here
  const togglePlayingVideo = (e) => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="relative h-50 w-full overflow-x-hidden">
      <video className="w-full h-50 top-0 left-0 z-0" autoPlay muted loop onClick={togglePlayingVideo}>
        <source src="https://assets.grab.com/wp-content/uploads/media/videos/hero_banner_singapore_q50_mobile.webm" type="video/mp4" />
      </video>
      <div className="h-30 w-100 bg-white border"></div>
      <div className="h-30 w-100 bg-white border"></div>
    </div>
  );
};
