import React from 'react';

function RandomImage() {
  // Generate a random number for the image ID
  const randomImageId = Math.floor(Math.random() * 1000); // You can adjust the range as needed

  // Construct the URL for the random image
  const imageUrl = `https://picsum.photos/200/300?image=${randomImageId}`;

  return (
    <div>
      <img className="w-10 h-10 rounded-full object-cover" src={imageUrl} alt="Random" />
    </div>
  );
}

export default RandomImage;