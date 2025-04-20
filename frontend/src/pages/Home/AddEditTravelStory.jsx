import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import DateSelector from "../../components/DateSelector";
import ImageSelector from "../../components/ImageSelector";
import TagInput from "../../components/TagInput";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import {toast} from 'react-toastify'
import uploadImage from "../../utils/uploadImage";

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [visitedLocation, setVisitedLocation] = useState(
    storyInfo?.visitedLocation || []
  );
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [story, setStory] = useState(storyInfo?.story || "");
  const [storyImg, setStoryImg] = useState(storyInfo?.imageURL || "");
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || "");

  const [error , setError] = useState("")
   //add new travel story*************************************************************************************************************
  const addNewTravelStory = async  ()=>{
    try {
      let imageURL = ""

      //upload image if present
      if(storyImg){
        const imgUploadRes = await uploadImage(storyImg);
        //get image url
        imageURL=imgUploadRes.imageURL || "";
      }
      const response =await axiosInstance.post('/add-travel-story',{
        title,story,imageURL:imageURL || "",visitedLocation,visitedDate:visitedDate?moment(visitedDate).valueOf():moment().valueOf(),
      });
      if(response.data && response.data.story){
        toast.success("story added successfully")
        //refresh stories 
        getAllTravelStories();
        //close modal or form 
        onClose();
      }
    }
    catch (error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
        
      }
      else{
        setError("An unexpected error occured. Please try again")
      }
  }

   }



   // update  travel story**********************************************************************************()
   const updateTravelStory = async ()=>{
    const StoryId = storyInfo._id
    console.log(StoryId)
     try {
       let imageURL = "";
       let postData = {
         title,
         story,
         imageURL: storyInfo.imageURL || "",
         visitedLocation,
         visitedDate: visitedDate
           ? moment(visitedDate).valueOf()
           : moment().valueOf(),
       };
       if(typeof storyImg==="object"){
        //upload New Image
        const imgUploadRes =await uploadImage(storyImg);
        imageURL = imgUploadRes.imageURL || "";
        postData = {
          ...postData,
          imageURL:imageURL,
        }
       }
       const response = await axiosInstance.put(`/edit-story/${StoryId}`, postData);
       if (response.data && response.data.story) {
         toast.success("story Updated successfully");
         //refresh stories
         getAllTravelStories();
         //close modal or form
         onClose();
       }
     } catch (error) {
       if (
         error.response &&
         error.response.data &&
         error.response.data.message
       ) {
         setError(error.response.data.message);
       } else {
         setError("An unexpected error occured. Please try again");
       }
     }
   }
  
  const handleAddOrUpdateClick =  async () => {
    // Save logic here
    console.log({ title, story, storyImg, visitedDate,visitedLocation });
    if(!title) {
      setError("please enter the title");
      return;

    }
    if(!story){
      setError("please enter the story");
      return
    }
    setError("")
    if(type==="edit"){
      updateTravelStory();
    }
    else{
      addNewTravelStory();
    }
  };

  //delete story image and update the story 
  const handleDeleteStoryImg = async ()=>{
    const deleteImgRes = await axiosInstance.delete('/delete-image',{
      params:{
        imageURL:storyInfo.imageURL,
      },

    });
    if(deleteImgRes.data){
      const storyId = storyInfo._id;
      const postData = {
        title,
        story,
        visitedLocation,
        visitedDate:moment().valueOf(),
        imageURL:""
      }
      //update story
      const response = await axiosInstance.put(`/edit-story/${storyId}`,postData);
      setStoryImg(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between p-3">
        <h5 className="text-[13px] sm:text-[20px] font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>
        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-0 sm:p-2 rounded-l-lg">
            {type === "add" ? (
              <button
                onClick={handleAddOrUpdateClick}
                className="flex items-center gap-1 text-xs font-medium bg-cyan-50 text-cyan-600 shadow-cyan-100 border border-cyan-100 hover:bg-cyan-600 hover:text-cyan-100 rounded px-2 py-1"
              >
                <IoIosAdd className="text-lg" /> Add Story
              </button>
            ) : (
              <>
                <button
                  onClick={handleAddOrUpdateClick}
                  className="flex items-center gap-1 text-xs font-medium bg-cyan-50 text-cyan-600 shadow-cyan-100 border-cyan-100 hover:bg-cyan-600 hover:text-cyan-100 rounded px-2 py-1"
                >
                  <MdEdit className="text-lg" /> Update
                </button>
                <button
                  onClick={handleAddOrUpdateClick}
                  className="flex items-center gap-1 text-xs font-medium bg-red-50 text-red-600 shadow-red-100 border-red-100 hover:bg-red-600 hover:text-red-100 rounded px-2 py-1"
                >
                  <MdDeleteForever className="text-lg" /> Delete
                </button>
              </>
            )}
            <button onClick={onClose}>
              <IoMdClose className="text-xl text-slate-400" />
            </button>
          </div>
          {error && (<p className="text-red-500 text-xs pt-2 text-right">{error}</p>)}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 p-3">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="A Day at the Great Wall"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="my-3">
          <DateSelector date={visitedDate} setDate={setVisitedDate} />
        </div>

        <ImageSelector image={storyImg} setImage={setStoryImg} handleDeleteImg={handleDeleteStoryImg} />

        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">Story</label>
          <textarea
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
            placeholder="Your story"
            rows={10}
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>
        <div className="pt-3">
          <label className="input-label">Visited Location</label>
          <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
