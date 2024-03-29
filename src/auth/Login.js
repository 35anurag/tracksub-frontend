import React, { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { StreamingAppContext } from "../context/StreamingAppContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passVisible, isPassVisible] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [error, setError] = useState("");

  const {
    setNotificationMessage,
  } = useContext(StreamingAppContext);

  const onSubmit = async (event) => {
    event.preventDefault();
    if(username && email && password){try {
      const response = await axios.post("https://tracksub-backend.onrender.com/auth/login", {  //"https://tracksub-backend.onrender.com/auth/login"http://localhost:3001/auth/login
        username,
        email,
        password,
      }, { withCredentials: true });

      if(response.data.message === "User Doesn't Exist"){
        setError("User doesn't exit. Please register first")
        return
      }

      if(response.data.message === "Username is incorrect"){
        setError("Username is incorrect")
        return
      }

      if(response.data.message === "Username or Password is incorrect"){
        setError("Username or Password is incorrect")
        return
      }

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      window.localStorage.setItem("username", username);
      setNotificationMessage("User is successfully loggedin!")
      navigate("/dashboard");
    } catch (error) {
      setError("Username or Password is incorrect");
    }}
  };

  const handleVisible = () => {
    isPassVisible(!passVisible);
  };

  return (
    <div className="bg-[#4492ae] min-h-screen w-screen lg:ml-[15rem] font-secondary overflow-hidden">
      <div className="ml-[5rem] mr-[5rem] pt-[3rem] flex flex-col items-center gap-4 text-white mb-[3rem]">
        <form onSubmit={onSubmit} className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-[30px] font-bold">Welcome back!</h1>
            <p className="text-[#ece8e1] opacity-80 lg:text-[18px] text-[18px] text-center">
              Simplify your workflow and manage your subs with
              <span className="font-semibold opacity-100"> TrackSub's</span>.
              Get Started
            </p>
          </div>
          <div className="flex flex-col gap-5 mt-6">
            <input
              onChange={(event) => setUsername(event.target.value)}
              className="outline-none w-[20rem] px-[5px] py-[10px] pl-5 pr-5 rounded-3xl text-black bg-white bg-opacity-75"
              type="text"
              placeholder="Username"
              id="username"
              value={username}
            />
            <input
              onChange={(event) => setEmail(event.target.value)}
              className="outline-none w-[20rem] px-[5px] py-[10px] pl-5 pr-5 rounded-3xl text-black bg-white bg-opacity-75"
              type="text"
              placeholder="Email"
              id="email"
              value={email}
            />

            <div className="relative">
              {passVisible ? (
                <input
                  onChange={(event) => setPassword(event.target.value)}
                  className="outline-none w-[20rem] px-[5px] py-[10px] pl-5 pr-5 rounded-3xl text-black bg-white bg-opacity-75"
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                ></input>
              ) : (
                <input
                  onChange={(event) => setPassword(event.target.value)}
                  className="outline-none w-[20rem] px-[5px] py-[10px] pl-5 pr-5 rounded-3xl text-black bg-white bg-opacity-75"
                  type="text"
                  placeholder="Password"
                  id="password"
                  value={password}
                ></input>
              )}
              <button
                onClick={handleVisible}
                className="absolute right-0 mt-[12px] mr-[15px] text-black"
                type="button"
              >
                {passVisible ? (
                  <IoEyeOutline className="text-[20px] opacity-50" />
                ) : (
                  <IoEyeOffOutline className="text-[20px] opacity-50" />
                )}
              </button>
              {error && 
              <p className="text-center mt-2 text-red-600 text-sm">{error}</p>
               }
            </div>
            
          </div>
          <div className="flex flex-col items-center my-[3rem] gap-5">
            <button
              className=" bg-[#ece8e1] bg-opacity-90 hover:bg-opacity-70 text-gray-700 font-semibold w-[20rem] px-[5px] py-[10px] pl-5 pr-5 rounded-3xl"
              type="submit"
            >
              Login
            </button>
            <p className="w-[20rem] h-[1px] bg-[#0214b998]"></p>
            <p>
              Not a member?
              <span className="opacity-70 hover:opacity-90">
                <Link to="/signin"> Register now</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
