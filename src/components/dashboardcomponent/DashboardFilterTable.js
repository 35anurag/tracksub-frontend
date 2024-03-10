import React, { useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { getUserID } from "../../hook/userID";

const DashboardFilterTable = ({
  filterData,
  subDetail,
  setSubDetail,
  setFilterAmount,
}) => {
  const userID = getUserID();
  useEffect(() => {
    let total = 0;
    subDetail.forEach((detail) => {
      if (detail.userOwner === userID) {
        total += detail.amount;
      }
    });
    setFilterAmount(total);
  }, [subDetail, setFilterAmount, userID]);

  const date = (date) => {
    if (date) {
      const onlyDate = date.slice(0, 10);
      return onlyDate;
    }
    return "";
  };

  const handleDel = (id) => {
    axios
      .delete(`https://tracksub-backend.onrender.com/subscription/dashboard/${id}`) //https://tracksub-backend.onrender.com/subscription/dashboard/${id} http://localhost:3001/subscription/dashboard/${id}
      .then(() => {
        setSubDetail(subDetail.filter((val) => val._id !== id));
      });
  };

  return (
    <div className="flex flex-col gap-8 overflow-x-auto max-w-[100%]">
      <table>
        <thead className="border-b-2 border-gray-600 rounded">
          <tr>
            <th className=" text-[20px] ml-[2rem] font-medium lg:text-[18px]">
              Streaming Service
            </th>
            <th className=" text-[20px] pl-[3rem] font-medium lg:text-[18px]">
              Account
            </th>
            <th className=" text-[20px] pl-[3rem] font-medium lg:text-[18px]">
              Amount
            </th>
            <th className=" text-[20px] pl-[3rem] font-medium lg:text-[18px]">
              Date
            </th>
            <th className="text-[20px] pl-[3rem] font-medium lg:text-[20px]">
              Manage
            </th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((filteredItem) => {
            const filteredSubscriptions = subDetail.filter(
              (detail) =>
                detail.appID === filteredItem.id && detail.userOwner === userID
            );

            if (filteredSubscriptions.length === 0) {
              return null;
            }

            return filteredSubscriptions.map((detail) => (
              <tr
                key={detail._id}
                className="border-b-2 border-gray-600 rounded"
              >
                <td className="flex flex-row items-center gap-1 w-[10rem] pr-[1rem] py-6">
                  <img
                    className="w-[4rem] h-auto"
                    src={filteredItem.image}
                    alt="appImage"
                  />
                  <p className="text-[18px]">{filteredItem.name}</p>
                </td>
                <td className="pr-[2rem]">
                  <p className="text-[18px] max-w-[1rem] pl-[3rem]">
                    {detail.accName}
                  </p>
                </td>
                <td className="pr-[2rem]">
                  <p className="max-w-[1rem] text-[18px] pl-[3rem]">
                    {detail.amount}
                  </p>
                </td>
                <td className="pr-[2rem]">
                  <p className="w-[10rem] text-[18px] pl-[4rem]">
                    {date(detail.date)}
                  </p>
                </td>
                <td className="pr-[2rem] pl-[3rem]">
                  <button
                    className="text-[25px]"
                    onClick={() => handleDel(detail._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardFilterTable;
