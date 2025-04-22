import React from 'react';
import disney from './../assets/Images/disney.png';
import marvel from './../assets/Images/marvel.png';
import nationalG from './../assets/Images/nationalG.png';
import pixar from './../assets/Images/pixar.png';
import starwar from './../assets/Images/starwar.png';

import starwarV from './../assets/Videos/star-wars.mp4';
import disneyV from './../assets/Videos/disney.mp4';
import marvelV from './../assets/Videos/marvel.mp4';
import nationalGeographicV from './../assets/Videos/national-geographic.mp4';
import pixarV from './../assets/Videos/pixar.mp4';

function ProductionHouse() {
  const productionHouseList = [
    { id: 1, image: disney, video: disneyV },
    { id: 2, image: pixar, video: pixarV },
    { id: 3, image: marvel, video: marvelV },
    { id: 4, image: starwar, video: starwarV },
    { id: 5, image: nationalG, video: nationalGeographicV },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 px-4 py-6 md:px-16">
      {productionHouseList.map((item) => (
        <div
          key={item.id}
          className="relative w-[150px] md:w-[200px] aspect-[3/2] rounded-lg 
                     border-2 border-gray-600 shadow-xl shadow-gray-800 overflow-hidden 
                     group hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
        >
          <img
            src={item.image}
            alt="production"
            className="w-full h-full object-cover rounded-lg"
          />

          <video
            src={item.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg 
                       opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10 pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
}

export default ProductionHouse;
