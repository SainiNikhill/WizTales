import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ onChange, value }) => {
  const [isShowPassword, setisShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setisShowPassword(!isShowPassword);
  };

  return (
    <div className="flex shadow-lg rounded py-3 border border-zinc-200 hover:outline-blue-700">
      <input
        value={value}
        onChange={onChange}
        placeholder="Password"
        className="w-full ml-4 outline-none"
        type={isShowPassword ? "text" : "password"}
      />
      {isShowPassword ? (
        <IoEyeOutline
          size={22}
          className="text-primary cursor-pointer mr-2"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-primary cursor-pointer mr-2"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
