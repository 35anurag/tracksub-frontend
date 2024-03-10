import React, { useState, useEffect, useContext } from "react";
import { StreamingAppContext } from "../context/StreamingAppContext";
import { Link } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import DashboardSearch from "../components/DashboardSearch";
import axios from "axios";
import { getUserID } from "../hook/userID";
import DashboardTable from "../components/dashboardcomponent/DashboardTable";
import DashboardFilterTable from "../components/dashboardcomponent/DashboardFilterTable";

const Dashboard = () => {
  const [subDetail, setSubDetail] = useState([]);
  const [visible, isVisible] = useState(true);
  const {
    filterData,
    filterAmount,
    setFilterAmount,
    notificationMessage,
    setNotificationMessage,
  } = useContext(StreamingAppContext);
  const userID = getUserID();

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const response = await axios.get(
          "https://tracksub-backend.onrender.com/subscription/dashboard" //"https://tracksub-backend.onrender.com/subscription/dashboard" http://localhost:3001/subscription/dashboard
        );
        setSubDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubs();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      isVisible(false);
      setNotificationMessage("");
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const notificationClose = () => {
    isVisible(false);
    setNotificationMessage("");
  };

  const totalAmount = () => {
    let total = 0;
    subDetail.forEach((detail) => {
      if (detail.userOwner === userID) {
        total += detail.amount;
      }
    });
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(total);
  };

  return (
    <div className="overflow-x-hidden bg-[#1d1d20] min-h-screen w-full lg:ml-[15rem] font-secondary relative ">
      <div className="ml-[2rem] mr-[2rem] pt-[1rem] lg:ml-[5rem] lg:mr-[5rem] lg:pt-[3rem] flex flex-col gap-4 text-white mb-[3rem]">
        <h1 className="text-[22px] lg:text-[25px] font-semibold text-white capitalize">
          Welcome {window.localStorage.getItem("username")}!
        </h1>
        <div className="flex flex-row justify-between items-center border-b-2 border-gray-600 pb-3">
          <h1 className="text-[18px] lg:text-[20px] font-semibold text-white">
            Subscriptions
          </h1>
          <Link
            className="hover:bg-[#025eb9] bg-[#395b7c] p-2 rounded-lg lg:text-sm flex flex-row items-center justify-center gap-1 lg:gap-2"
            to="/streamingApp"
          >
            <IoAddOutline className="text-lg lg:text-[15px] " />
            <p className="font-medium lg:font-semibold text-[11px] lg:text-[13px]">Add new subscription</p>
          </Link>
        </div>

        <DashboardSearch />

        <div>
          {filterData.length === 0 ? (
            <DashboardTable subDetail={subDetail} setSubDetail={setSubDetail} totalAmount={totalAmount()} />
          ) : (
            <DashboardFilterTable
              filterData={filterData}
              subDetail={subDetail}
              setSubDetail={setSubDetail}
              filterAmount={filterAmount}
              setFilterAmount={setFilterAmount}
            />
          )}
        </div>
      </div>

      {notificationMessage && (
        <div className="absolute top-0 right-0 mt-[1rem] mr-[1rem] text-white">
          {visible && (
            <div className=" bg-[#00537d] rounded-[7px] relative">
              <p className="px-6 py-4 ">{notificationMessage}</p>
              <button
                className="ml-6 absolute top-0 right-0 mt-[5px] mr-[5px] text-[#e4e3de]"
                onClick={notificationClose}
              >
                <IoClose />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
