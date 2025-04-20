import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import TravelStoryCard from "../../components/TravelStoryCard";

import axiosInstance from "../../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditTravelStory from "./AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";
import HeroSection from "../../components/HeroSection";


const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [FilterType, setFilterType] = useState("");


  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("Failed to fetch user:", error);
      }
    }
  };

  // Get all travel stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/get-all-stories");
      if (response.data?.stories) {
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    }
  };

  // Handle edit click
  const handleEdit = (data) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: data });
  };

  // Handle story view
  const handleViewStory = (data) => {
    setOpenViewModal({ isShown: true, data });
  };

  // Handle favorite toggle
  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id;
    try {
      const response = await axiosInstance.put(
        `/update-is-favourite/${storyId}`,
        { isFavourite: !storyData.isFavourite }
      );
      if (response.data && response.data.story) {
        
        getAllTravelStories();
      }
    } catch (error) {
      console.log("An unexpected error occured. please try again");
    }
  };

  //delete Story
  const deleteTravelStory = async (data) => {
    const storyId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-story/${storyId}`);

      if (response.data && !response.data.error) {
        toast.error("Story Deleted successfully");
        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
        getAllTravelStories();
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
  };
  //search story
  const onSearchStory = async (query) => {
    console.log("searching for:", query); // Debug
    try {
      const response = await axiosInstance.post(`/search`, { query });
      console.log("searchresponse", response.data);
      if (response.data && response.data.stories) {
        setFilterType("search");
        setAllStories(response.data.stories);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("search failed", error.response || error.message);
    }
  };

  const handleClearSearch = () => {
    setFilterType("");
    getAllTravelStories();
  };




  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
  }, []);

  return (
   
        <>
          <Navbar
            userInfo={userInfo}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={onSearchStory}
            handleClearSearch={handleClearSearch}

          />
          <HeroSection />
          <div className="container mx-auto py-10 px-4 flex ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {allStories.length > 0 ? (
                allStories.map((item) => (
                  <TravelStoryCard
                    key={item._id}
                    title={item.title}
                    story={item.story}
                    imageURL={item.imageURL}
                    date={item.visitedDate}
                    visitedLocation={item.visitedLocation}
                    isFavourite={item.isFavourite}
                    onEdit={() => handleEdit(item)}
                    onClick={() => handleViewStory(item)}
                    onFavouriteClick={() => updateIsFavourite(item)}
                  />
                ))
              ) : (
                <p>No stories found.</p>
              )}
            </div>
          </div>

          {/* add and edit travel story models  */}
          <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() => {}}
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
                zIndex: 999,
              },
            }}
            appElement={document.getElementById("root")}
            className="w-[80vw] md:w-[40%] h-[80vh] rounded-lg mx-auto mt-30 overflow-y-scroll bg-white scrollbar  z-50"
          >
            <AddEditTravelStory
              type={openAddEditModal.type}
              storyInfo={openAddEditModal.data}
              onClose={() => {
                setOpenAddEditModal({
                  isShown: false,
                  type: "add",
                  data: null,
                });
              }}
              getAllTravelStories={getAllTravelStories}
            />
          </Modal>

          {/* view travel story  */}
          <Modal
            isOpen={openViewModal.isShown}
            onRequestClose={() => {}}
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
                zIndex: 999,
              },
            }}
            appElement={document.getElementById("root")}
            className="w-[80vw] md:w-[40%] lg:w-[30vw] h-[80vh] rounded-lg mx-auto mt-30 overflow-y-scroll bg-white scrollbar z-50"
          >
            <ViewTravelStory
              type={openViewModal.type}
              storyInfo={openViewModal.data || null}
              onEditClick={() => {
                setOpenViewModal((prevState) => ({
                  ...prevState,
                  isShown: false,
                }));
                handleEdit(openViewModal.data || null);
              }}
              onClose={() => {
                setOpenViewModal((prevState) => ({
                  ...prevState,
                  isShown: false,
                }));
              }}
              onDeleteClick={() => {
                deleteTravelStory(openViewModal.data || null);
              }}
            />
          </Modal>

          <button
         className="w-10 h-10 rounded-full bg-zinc-950 text-white flex items-center justify-center right-10 bottom-10 fixed z-[9999] hover:scale-110 transition-transform duration-300 shadow-lg"

            onClick={() => {
              setOpenAddEditModal({ isShown: true, type: "add", data: null });
            }}
            
          >
            <MdAdd />
          </button>

          <ToastContainer />
        </>
    
  
  );
};

export default Home;
