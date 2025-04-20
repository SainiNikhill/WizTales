// ImageCarousel.jsx
import React from "react";
import Slider from "react-slick";

import img1 from '../assets/images/jaipur.jpg'
import img2 from '../assets/images/beach.jpg'
import img3 from '../assets/images/colosseum.jpg'
import img4 from '../assets/images/catedral.jpg'
import img5 from '../assets/images/japan.jpg'
import img6 from '../assets/images/matterhorn.jpg'
import img7 from '../assets/images/osaka.jpg'
import img8  from '../assets/images/matterhorn2.jpg'
import img9 from '../assets/images/sunset.jpg'
import img10 from '../assets/images/mountfuji.jpg'
const images = [
  img1,img2,img3,img4,img5,img6,img7,img8,img9,img10
];

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 rounded overflow-hidden shadow-lg">
      <Slider {...settings}>
        {images.map((url, idx) => (
          <div key={idx}>
            <img
              src={url}
              alt={`Slide ${idx + 1}`}
              className="w-full h-64 object-cover rounded"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
