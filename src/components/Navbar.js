import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [hamburger, setHamburger] = useState(false);
  const navigate = useNavigate();

  const handleButton = () => {
    setHamburger(true);
  };

  const handleCloseHamburger = () => {
    setHamburger(false);
  };

  const Logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("username");
    setHamburger(false);
    navigate("/login");
  };

  const menuDiv = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.6,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0.6,
        ease: [0.12, 1, 0.39, 1],
      },
    },
  };

  return (
    <div className="fixed z-10">
      <div className="bg-[#ffffff] hidden md:block lg:block h-screen w-[15rem] border-black">
        <div className=" flex flex-col justify-between items-center p-2">
          {!cookies.access_token ? (
            <div className="flex flex-col items-center">
              <div>
                <Link
                  to="/login"
                  className="text-[30px] font-semibold text-[#025eb9] font-primary"
                >
                  TrackSubs
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center mt-[7rem]">
                <Link
                  to="/login"
                  className="font-medium text-[18px] text-[#1d1d20] border-t border-b p-5 rounded-tl-3xl rounded-bl-3xl hover:bg-[#eeebe7] border-black w-[15rem] text-center "
                >
                  Dashboard
                </Link>
                <Link
                  to="/login"
                  className="font-medium text-[18px] text-[#1d1d20] border-b p-5 hover:bg-[#eeebe7] rounded-bl-3xl border-black w-[15rem] text-center "
                >
                  Streaming App
                </Link>
                <Link
                  to="/login"
                  className="font-medium text-[18px] border-b p-5 hover:bg-[#eeebe7] rounded-bl-3xl border-black w-[15rem] text-center "
                >
                  Login
                </Link>
                <Link
                  to="/signin"
                  className="font-medium text-[18px] border-b p-5 hover:bg-[#eeebe7] rounded-bl-3xl border-black w-[15rem] text-center "
                >
                  Signin
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div>
                <Link
                  to="/dashboard"
                  className="text-[30px] font-semibold text-[#025eb9] font-primary"
                >
                  TrackSubs
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center mt-[7rem]">
                <Link
                  to="/dashboard"
                  className="font-medium text-[18px] text-[#1d1d20] border-t border-b p-5 rounded-tl-3xl rounded-bl-3xl hover:bg-[#eeebe7] border-black w-[15rem] text-center "
                >
                  Dashboard
                </Link>
                <Link
                  to="/streamingApp"
                  className="font-medium text-[18px] text-[#1d1d20] border-b p-5 hover:bg-[#eeebe7] rounded-bl-3xl border-black w-[15rem] text-center "
                >
                  Streaming App
                </Link>
                <p className="font-medium text-[18px] capitalize border-b p-5 rounded-bl-3xl border-black w-[15rem] text-center ">
                  {window.localStorage.getItem("username")}
                </p>
                <button
                  onClick={Logout}
                  className="font-medium text-[18px] border-b p-5 hover:bg-[#eeebe7] rounded-bl-3xl border-black w-[15rem] text-center "
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
 
      <div className="relative lg:hidden md:hidden font-secondary">
        {!cookies.access_token ? null : (
          <button
            onClick={handleButton}
            className="absolute z-10 top-0 ml-[20rem] mt-[22px]"
          >
            <CiMenuFries className="text-[25px] text-white" />
          </button>
        )}
        <AnimatePresence>
          {hamburger && (
            <motion.div
              variants={menuDiv}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed z-10 w-screen h-screen origin-top block bg-white pt-[10rem] pl-[3rem] pr-[3rem]"
            >
              <div className="flex flex-col gap-[3rem] text-[23px] font-medium items-center justify-center">
                {!cookies.access_token ? (
                  <div className="flex flex-col gap-[3rem] text-[23px] font-medium items-center justify-center">
                    <Link to="/login">Dashboard</Link>
                    <Link to="/login">Streaming App</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signin">Signin</Link>
                  </div>
                ) : (
                  <div>
                    <motion.div
                      className="flex flex-col gap-[3rem] text-[23px] font-medium items-center justify-center"
                    >
                      <Link to="/dashboard" onClick={handleCloseHamburger}>
                        Dashboard
                      </Link>
                      <Link to="/streamingApp" onClick={handleCloseHamburger}>
                        Streaming App
                      </Link>
                      <p>{window.localStorage.getItem("username")}</p>
                      <button onClick={Logout}>Logout</button>
                    </motion.div>
                    <button
                      onClick={handleCloseHamburger}
                      className="absolute top-0 right-0 mt-5 mr-5"
                    >
                      <IoIosClose className="text-[40px]" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
