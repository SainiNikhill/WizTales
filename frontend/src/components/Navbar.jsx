import React from "react";
import logo from "../assets/images/wiznavbar3.png";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleClearSearch,
}) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearchClick = () => {
    if (searchQuery) {
      handleSearch(searchQuery); // Trigger search when search icon is clicked
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery(""); // Clear the search query on clicking the clear button
  };

  return (
    <div className="bg-transparent fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4">
      <div className="logo-container w-35 overflow-hidden rounded  ">
        <img src={logo} alt="Logo" className="object-cover  " />
      </div>
      {isToken && userInfo && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearchClick}
            onClearSearch={onClearSearch}
          />
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </>
      )}
    </div>
  );
};

export default Navbar;
