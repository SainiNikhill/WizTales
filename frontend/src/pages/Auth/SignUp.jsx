import React, { useState } from "react";

import logo from "../../assets/images/wizlogo2.png";
import PasswordInput from "../../components/PasswordInput";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";


import img7 from "../../assets/images/osaka.jpg";






const SignUp = () => {
  const[fullname,setFullname] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("please enter a valid email address");
      return;
    }
    if (!password) {
      setError("please enter the password");
      return;
    }
    if (!fullname) {
      setError("please enter the fullname");
      return;
    }
    setError("");

    // Signup API call
    try {
      const response = await axiosInstance.post("/create-account", {
        email: email,
        password: password,
        fullname:fullname
      });
      // handle succesful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // handle signup errors  
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error accurred. please try again");
      }
    }
  };
  return (
    <div className="h-screen relative  flex items-center justify-center   ">
      <div className="w-[80%] sm:w-[70%] h-[90%]  rounded-lg  flex flex-col sm:flex-row overflow-hidden shadow-2xl">
        <div
          className="w-full sm:w-1/2 bg-cover bg-center relative h-[30%] sm:h-full"
          style={{ backgroundImage: `url(${img7})` }}
        >
          <div className="text-over-img absolute  p-4 bottom-0 text-white ">
            <h1 className="font-bold text-xl md:text-6xl">
              Join the <br />Adventure
            </h1>
            <p className="text-sm sm:text-lg">
             Create an account to start documenting your travels and preserve your memories in your personal travel journal.
            </p>
          </div>
        </div>

        {/* signup div */}
        <div className=" w-full sm:w-1/2  flex flex-col items-center justify-center p-10 sm:p-5">
          {/* logo  */}
          <div className="h-25 w-25 overflow-hidden bg-red-50 rounded-full -mt-7 mb-2 sm:mb-5">
            <img className="object-cover h-26" src={logo} alt="" />
          </div>
          {/* welcome txt */}
          <h1 className="text-3xl md:text-3xl font-bold text-center ">
            Create Account
          </h1>
          <p className="text-sm md:text-[15px] text-center">
            Join and share memories with us
          </p>
          {/* form  */}
          <div className="w-full sm:w-[55%] mt-6 sm:mt-8">
            <form onSubmit={handleSignup} className=" flex flex-col">
              <div className=" flex flex-col gap-2">
                {" "}
                <label className="block text-xs font-semibold text-gray-800 ">
                  Name
                </label>
                <input 
                type="text"
                placeholder="Enter your name" 
                value={fullname}
                onChange={({target})=>{
                  setFullname(target.value)
                }}
                className="rounded shadow-lg px-4 py-3 outline-none border border-zinc-200 "/>
                <label className="block text-xs font-semibold text-gray-800 ">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={({ target }) => {
                    setEmail(target.value);
                  }}
                  className="rounded  shadow-lg px-4 py-3 outline-none border border-zinc-200  "
                  required
                />
                <label className="block text-xs font-semibold text-gray-800 ">
                  Password
                </label>
                <PasswordInput
                  value={password}
                  onChange={({ target }) => {
                    setPassword(target.value);
                  }}
                />
                {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-800 text-white  px-3 py-2 font-medium rounded text-lg mt-10 cursor-pointer"
              >
              Sign up
              </button>
              <hr className=" border-t border-gray-300 my-4" />
              <p className="text-center text-sm sm:text-[15px]">
                Already a user?{" "}
                <a href="/login" className="text-red-800">
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
