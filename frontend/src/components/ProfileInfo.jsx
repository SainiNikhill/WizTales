import React , { useState , useRef , useEffect }from "react";
import { getInitials } from "../utils/helper";


const ProfileInfo = ({ userInfo, onLogout }) => {

   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null)


   // close dropdown if click outside the div 
   useEffect(()=>{
    const handleClickOutside = (event) =>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setIsOpen(false)
      }
      
    };

    document.addEventListener("mousedown",handleClickOutside);
    return()=>{
      document.removeEventListener("mousedown",handleClickOutside)
    };
   },[]);





  return (
    <div className="relative" ref={dropdownRef}>
      {/* clickable avatar div */}
      <div className="w-10 sm:w-14 h-10 sm:h-14 bg-white text-slate-900 rounded-full flex items-center justify-center font-semibold cursor-pointer"
      onClick={()=> setIsOpen(!isOpen)}>
        {userInfo?.fullname?.[0] || "U"}
      </div>
      {/* dropdown menu  */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-30 bg-white rounded-md shadow-lg z-50 ">
          <div className="px-4 py-2 text-sm text-gray-800 bg-gray-100 rounded">
            {userInfo?.fullname || "unknown user"}
          </div>
          

          <button onClick={onLogout}
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500 cursor-pointer">Logout</button>
          </div>
      )}
      
    </div>
 
  );
};

export default ProfileInfo;
