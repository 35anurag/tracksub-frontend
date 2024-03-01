import React, { useState, useContext } from "react";
import axios from "axios";
import { getUserID } from "../hook/userID.js";
import { useNavigate } from "react-router-dom";
import { StreamingAppContext } from "../context/StreamingAppContext";
import { IoClose } from "react-icons/io5";

const AppDetail = ({ index, image,isToggleDetail }) => {
  const { setNotificationMessage } = useContext(StreamingAppContext);
  const userID = getUserID();
  const navigate = useNavigate();
  const [appDetail, setAppDetail] = useState({
    appID: index,
    accName: "",
    amount: 0,
    date: 0,
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppDetail({ ...appDetail, [name]: value });
  };

  const handleClose=()=>{
    isToggleDetail(false)
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://tracksub-backend.onrender.com", //http://localhost:3001/subscription/dashboard
        appDetail
      );
      setNotificationMessage("Subscription is added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen fixed bg-black">
      <div className="ml-[5rem] mt-[3rem] max-w-[55rem]">
        <div className="">
          <h1 className="text-[27px] font-semibold capitalize border-b ">
            Add New Subscription
          </h1>
        </div>
        <div className="relative mt-[1rem] flex flex-row items-center justify-between border border-white px-[20px] py-[20px] rounded-[10px]">
        <button onClick={handleClose} className="absolute right-0 top-0 mr-[1rem] mt-[1rem]"><IoClose /></button>
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="accName" className="text-[20px] font-semibold">
                Account Name
              </label>
              <input
                placeholder="Account Name"
                onChange={handleChange}
                name="accName"
                type="text"
                id="accName"
                className="w-[20rem] p-[8px] rounded-[10px] pl-4 text-black outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="amount" className="text-[20px] font-semibold">
                Subscription Amount
              </label>
              <input
                placeholder="Amount"
                onChange={handleChange}
                name="amount"
                type="number"
                id="amount"
                className="w-[20rem] p-[8px] rounded-[10px] pl-4 text-black outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="expDate" className="text-[20px] font-semibold">
                Expiry Date
              </label>
              <input
                onChange={handleChange}
                name="date"
                placeholder="Date"
                type="date"
                min="2010-01-01"
                max="2050-12-31"
                id="expDate"
                className="w-[20rem] p-[8px] rounded-[10px] pl-4 text-black outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-[#025eb9] w-[20rem] mt-[1rem] hover:bg-[#395b7c] p-2 rounded-lg text-sm flex flex-row items-center justify-center gap-2"
            >
              Add Subscription
            </button>
          </form>
          <div>
            <h1><img src={image} alt="serviceprovider" className="w-[15rem] h-[9rem]"/></h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetail;
