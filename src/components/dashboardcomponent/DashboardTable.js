import React, { useContext } from "react";
import { StreamingAppContext } from "../../context/StreamingAppContext";
import { getUserID } from "../../hook/userID";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const DashboardTable = ({ subDetail, setSubDetail, totalAmount }) => {
  const { data } = useContext(StreamingAppContext);
  const userID = getUserID();

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
      .delete(`https://tracksub-backend.onrender.com/subscription/dashboard/${id}`) //`https://tracksub-backend.onrender.com/subscription/dashboard/${id}` http://localhost:3001/subscription/dashboard/${id}
      .then(() => {
        setSubDetail(
          subDetail.filter((val) => {
            return val._id !== id;
          })
        );
      });
  };
  return (
    <div className="flex flex-col gap-8 overflow-x-auto max-w-[100%]">
      <table>
        <thead className="border-b-2 border-gray-600 rounded">
          <tr>
            <th className="text-[18px] ml-[2rem] font-medium lg:text-[16px]">
              Streaming Service
            </th>
            <th className="text-[18px] pl-[3rem] font-medium lg:text-[16px]">
              Account
            </th>
            <th className="text-[18px] pl-[3rem] font-medium lg:text-[16px]">
              Amount
            </th>
            <th className="text-[18px] pl-[3rem] font-medium lg:text-[16px]">
              Date
            </th>
            <th className="text-[18px] pl-[3rem] font-medium lg:text-[16px]">
              Manage
            </th>
          </tr>
        </thead>
        <tbody>
          {subDetail.map((detail) => {
            if (detail.userOwner === userID) {
              return (
                <tr key={detail._id} className="border-b-2 border-gray-600 rounded">
                  <td className="flex flex-row items-center gap-1 w-[10rem] pr-[1rem] py-6">
                    <img
                      className="w-[4rem] h-auto"
                      src={gettingImage(detail.appID)}
                      alt="appImage"
                    />
                    <p className="text-[15px]">
                      {gettingData(detail.appID)}
                    </p>
                  </td>
                  <td className="pr-[1rem]">
                    <p className="text-[15px] max-w-[1rem] pl-[3rem]">{detail.accName}</p>
                  </td>
                  <td className="pl-[3rem]">
                    <p className="max-w-[1rem] text-[15px] pl-[3rem]">{detail.amount}</p>
                  </td>
                  <td className="pr-[1rem]">
                    <p className="w-[12rem] text-[15px] pl-[6rem]">{date(detail.date)}</p>
                  </td>
                  <td className=" pl-[5rem]">
                    <button
                      className="text-[22px]"
                      onClick={() => handleDel(detail._id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
        <tfoot>
          <tr className="text-[15px] border-b-2 border-gray-600 rounded">
            <th className="font-normal py-3">Total</th>
            <th className="font-normal pl-[2rem]">{totalAmount}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DashboardTable;
