import React, { useContext } from "react";
import { StreamingAppContext } from "../../context/StreamingAppContext";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const DashboardTable = ({ subDetail, setSubDetail }) => {
  const { data } = useContext(StreamingAppContext);

  const gettingData = (index) => {
    const appData = data.find((app) => app.id === index);
    return appData ? appData.name : "";
  };

  const gettingImage = (index) => {
    const appData = data.find((app) => app.id === index);
    return appData ? appData.image : "";
  };

  const date = (date) => {
    if (date) {
      const onlyDate = date.slice(0, 10);
      return onlyDate;
    }
    return "";
  };

  const handleDel = (id) => {
    axios
      .delete(`http://localhost:3001/subscription/dashboard/${id}`)
      .then(() => {
        setSubDetail(
          subDetail.filter((val) => {
            return val._id !== id;
          })
        );
      });
  };
  return (
    <div className="flex flex-col gap-8">
      {subDetail.map((detail) => (
        <div key={detail._id}>
          <div className="flex flex-row justify-start gap-[5rem] items-center border-b-2 border-gray-600	rounded hover:bg-[#4d9ab6] bg-blur-lg p-3">
            <div className="flex flex-row items-center justify-start w-[168px] gap-2">
              <img
                className="max-w-[4rem] h-auto"
                src={gettingImage(detail.appID)}
                alt="appImage"
              />
              <p className="text-[19px] max-w-[5rem] font-medium">
                {gettingData(detail.appID)}
              </p>
            </div>
            <p className="w-[6rem]">{detail.accName}</p>
            <p className="w-[6rem] ">{detail.amount}</p>
            <p className="w-[7rem]">{date(detail.date)}</p>
            <button className="text-[25px] ml-4" onClick={() => handleDel(detail._id)}><MdDelete /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardTable;
