  import React, { useState } from "react";
  import axios from "axios";
  import { IoEyeOutline } from "react-icons/io5";
  import { IoEyeOffOutline } from "react-icons/io5";
  import { useNavigate } from "react-router-dom";

  const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passVisible, isPassVisible] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (event) => {
      event.preventDefault();
      if(username && password){try {
        await axios.post("https://tracksub-backend.onrender.com/auth/register", { //http://localhost:3001/auth/register
          username,
          password,
        }, { withCredentials: true });
        navigate("/login")
        setUsername("")
        setPassword("")
      } catch (error) {
        console.log(error);
        // navigate("/login")
      }}
    };

    const handleVisible = () => {
      isPassVisible(!passVisible);
    };

    return (
      <div className="bg-[#4492ae] min-h-screen w-full font-secondary">
        <div className="ml-[5rem] mr-[5rem] pt-[3rem] flex flex-col items-center gap-4 text-white mb-[3rem]">
          <form onSubmit={onSubmit} className="flex flex-col items-center">
            <h1 className="text-[35px] font-bold">Register</h1>
            <div className="flex flex-col gap-5 mt-6">
              <input
                onChange={(event) => setUsername(event.target.value)}
                className="outline-none w-[20rem] px-[5px] py-[10px] pl-5 pr-5 rounded-3xl text-black bg-white bg-opacity-75"
                type="text"
                placeholder="Username"
                id="username"
                value={username}
              ></input>
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
              </div>
            </div>
            <button
              className="my-[3rem] bg-[#ece8e1] bg-opacity-90 hover:bg-opacity-70 text-gray-700 font-semibold w-[20rem] px-[5px] py-[10px] pl-5 pr-5 rounded-3xl"
              type="submit"
            >
              Signin
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default Signin;
