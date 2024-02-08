import React, { useState, useEffect, useContext } from "react";
import { StreamingAppContext } from "../context/StreamingAppContext";
import { Link } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import DashboardComp from "../components/DashboardSearch";
import axios from "axios";
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

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/subscription/dashboard"
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
      total += detail.amount;
    });
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(total);
  };

  return (
    <div className="bg-[#4492ae] min-h-screen w-full font-secondary relative">
      <div className="ml-[5rem] mr-[5rem] pt-[3rem] flex flex-col gap-4 text-white mb-[3rem]">
        <h1 className="text-[27px] font-semibold text-black capitalize">
          Welcome {window.localStorage.getItem("username")}!
        </h1>
        <div className="flex flex-row justify-between items-center border-b-2 border-gray-600 pb-3">
          <h1 className="text-[22px] font-medium text-black">Subscriptions</h1>
          <Link
            className="bg-[#025eb9] hover:bg-[#395b7c] p-2 rounded-lg text-sm flex flex-row items-center justify-center gap-2"
            to="/streamingApp"
          >
            <IoAddOutline className="text-xl " />
            <p className="font-semibold">Add new subscription</p>
          </Link>
        </div>

        <DashboardComp />

        <div className="flex flex-row justify-between items-center border-b-2 border-gray-600	rounded pb-2 text-lg mt-[1rem]">
          <p className="w-[11rem] text-[20px]">Streaming Service</p>
          <p className="w-[7rem] text-[20px]">Account</p>
          <p className="w-[7rem] text-[20px]">Amount</p>
          <p className="w-[7rem] text-[20px]">Expiry</p>
          <p className="text-[20px]">Manage</p>
        </div>

        <div>
          {filterData.length === 0 ? (
            <DashboardTable subDetail={subDetail} setSubDetail={setSubDetail} />
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
        {filterData.length === 0 && (
          <div className="border-b-2 border-gray-600 rounded pb-2 flex flex-row items-center">
            <p className="text-[18px] font-semibold">Total</p>
            <div className="font-semibold ml-[398px]">{totalAmount()}</div>
          </div>
        )}
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
