
import React from "react";
import v1 from '../assets/videos/v6.mp4'


const HeroSection = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden rounded pt-20 font-['League_Spartan']  ">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full  object-cover "
      >
        <source
          src={v1}
          type="video/mp4"
        />
        {/* Add a fallback image or message if needed */}
      </video>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Explore Magical Destinations
        </h1>
        <p className="text-lg md:text-xl max-w-xl">
          Discover and share magical travel stories from around the world with
          WizTales ✨
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
