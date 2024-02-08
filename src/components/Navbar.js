import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const Logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("username");
    navigate("/login");
  };
  return (
    <div className="bg-[#ece8e1] h-auto w-[15rem] border-b border-black">
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
                className="font-medium text-[18px] text-black border-t border-b p-5 rounded-tl-3xl rounded-bl-3xl hover:bg-[#eeebe7] border-black w-[15rem] text-center "
              >
                Dashboard
              </Link>
              <Link
                to="/login"
                className="font-medium text-[18px] text-black border-b p-5 hover:bg-[#eeebe7] rounded-bl-3xl border-black w-[15rem] text-center "
              >
                Streaming App
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
                className="font-medium text-[18px] text-black border-t border-b p-5 rounded-tl-3xl rounded-bl-3xl hover:bg-[#eeebe7] border-black w-[15rem] text-center "
              >
                Dashboard
              </Link>
              <Link
                to="/streamingApp"
                className="font-medium text-[18px] text-black border-b p-5 hover:bg-[#eeebe7] rounded-bl-3xl border-black w-[15rem] text-center "
              >
                Streaming App
              </Link>
            </div>
          </div>
        )}

        <div>
          {!cookies.access_token ? (
            <div className="flex flex-col items-center justify-center text-black ">
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
          ) : (
            <div className="flex flex-col items-center justify-center text-black">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
