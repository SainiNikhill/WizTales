import React from "react";
import moment from "moment/moment";
import { FaHeart } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";


const TravelStoryCard = ({
  imageURL,
  title,
  date,
  story,
  visitedLocation = [],
  isFavourite,
  onFavouriteClick,
  onClick,
}) => {
  return (
    <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition cursor-pointer relative">
      <img
        src={imageURL}
        alt={title}
        className="w-full h-60 object-cover"
        onClick={onClick}
      />
      <div className="p-4" onClick={onClick}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h6 className="text-md font-semibold">{title}</h6>
            <p className="text-xs text-slate-500">
              {date ? moment(date).format("Do MMM YYYY") : "-"}
            </p>
          </div>
          <button
            className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg absolute top-4 right-4"
            onClick={(e)=>{
              e.stopPropagation()
              onFavouriteClick();
            }}
          >
            <FaHeart
              className={`text-lg cursor-pointer ${
                isFavourite ? "text-red-500" : "text-white"
              }`}
            />
          </button>
        </div>

        <p className="text-sm text-slate-700 mb-2 line-clamp-3">{story}</p>
        {visitedLocation.length > 0 && (
          <div className="flex flex-wrap gap-2 ">
            {visitedLocation.map((item, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-1 text-[13px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1"
              >
                <GrMapLocation className="text-sm" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  );
};

export default TravelStoryCard;
