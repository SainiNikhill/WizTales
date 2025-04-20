import React from "react";
import { MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import moment from "moment";
import { GrMapLocation } from "react-icons/gr";

const ViewTravelStory = ({
  onClose,
  storyInfo,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
          <button className="btn-primary" onClick={onEditClick}>
            <MdUpdate className="text-lg" />
            Update
          </button>
          <button className="btn-delete" onClick={onDeleteClick}>
            <MdDeleteOutline className="text-lg" />
            Delete
          </button>
          <button className="btn-close" onClick={onClose}>
            <MdClose className="text-lg" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 py-4 px-2">
        <h1 className="text-2xl font-bold  text-slate-950  uppercase ">
          {storyInfo?.title}
        </h1>
        <span className="text-xs text-blue-400">
          {storyInfo?.visitedDate &&
            moment(storyInfo.visitedDate).format("Do MMM YYYY")}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <GrMapLocation className="text-sm text-black font-bold" />
          {storyInfo?.visitedLocation?.map((item, index) => (
            <span
              key={index}
              className="bg-pink-100  text-pink-600 text-xs font-medium px-3 py-2  rounded"
            >
              {item}
            </span>
          ))}
        </div>
        
          <div className="rounded-2xl w-full">
            <img
              src={storyInfo && storyInfo.imageURL}
              alt="selected"
              className="w-full  object-cover rounde-lg"
            />
          </div>
       

        <div className="mt-3 text-sm text-zinc-940 p-2 ">
          {storyInfo?.story || "No story description provided."}
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;
