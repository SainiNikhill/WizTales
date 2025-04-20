import React, { useState } from "react";
import loginimg from "../../assets/images/aurora.jpg";
import logo from "../../assets/images/wizlogo2.png";
import PasswordInput from "../../components/PasswordInput";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    if(!validateEmail(email)){
      setError("please enter a valid email address")
      return
    }
    if(!password) {
      setError("please enter the password");
      return
    }
    setError("")

    // login API call
    try{
      const response = await axiosInstance.post('/login',{
      email:email,
      password:password,
    });
    // handle succesful login response 
    if(response.data && response.data.accessToken){
      localStorage.setItem("token",response.data.accessToken);
      navigate("/dashboard")
    }
  } catch(error){
    // handle login error 
    if(
      error.response && error.response.data && error.response.data.message
    ) {setError(error.response.data.message)}
    else{
      setError("An unexpected error accurred. please try again")

    }
  }
  };
  return (
    <div className="h-screen relative  flex items-center justify-center   ">
      <div className="w-[80%] sm:w-[70%] h-[90%]  rounded-lg  flex flex-col sm:flex-row overflow-hidden shadow-2xl">
        <div
          className="w-full sm:w-1/2 bg-cover bg-center relative h-[30%] sm:h-full"
          style={{ backgroundImage: `url(${loginimg})` }}
        >
          <div className="text-over-img absolute  p-4 bottom-0 text-white ">
            <h1 className="font-bold text-xl md:text-6xl">
              Capture Your <br /> Journeys
            </h1>
            <p className="text-sm sm:text-lg">
              record your travel experiences and memories in your personal
              travel journal.
            </p>
          </div>
        </div>

        {/* login div */}
        <div className=" w-full sm:w-1/2  flex flex-col items-center justify-center p-10 sm:p-5">
          {/* logo  */}
          <div className="h-25 w-25 overflow-hidden bg-red-50 rounded-full -mt-7 mb-2 sm:mb-5">
            <img className="object-cover h-26" src={logo} alt="" />
          </div>
          {/* welcome txt */}
          <h1 className="text-3xl md:text-4xl font-bold text-center ">
            Welcome Back
          </h1>
          <p className="text-sm md:text-[15px] text-center">
            Login to access your travel memories.
          </p>
          {/* form  */}
          <div className="w-full sm:w-[55%] mt-6 sm:mt-8">
            <form onSubmit={handleLogin} className=" flex flex-col">
              <div className=" flex flex-col gap-2">
                {" "}
                <label className="block text-m font-semibold text-gray-800 ">
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
                <label className="block text-m font-semibold text-gray-800 ">
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
                className="w-full bg-[#da1e37] hover:bg-[#c71f37]  px-3 py-2 font-semibold text-white rounded text-lg mt-10 cursor-pointer "
              >
                Log in
              </button>
              <hr className=" border-t border-gray-300 my-4" />
              <p className="text-center text-sm sm:text-[15px]">
                Don't have an account?{" "}
                <a href="/signup" className="text-red-800">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
