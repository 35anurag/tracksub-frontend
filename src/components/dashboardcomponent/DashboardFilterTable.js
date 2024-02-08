import React, {useEffect} from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const DashboardFilterTable = ({ filterData, subDetail, setSubDetail,filterAmount, setFilterAmount }) => {

  const gettingFilterAccName = (index) => {
    const appAccName = subDetail.find((app) => app.appID === index);
    return appAccName ? appAccName.accName : "";
  };

  const gettingFilterAmount = (index) => {
    const appAccName = subDetail.find((app) => app.appID === index);
    return appAccName ? appAccName.amount : "";
  };

  useEffect(() => {
    let total = 0;
    subDetail.forEach((detail) => {
      const appAmount = gettingFilterAmount(detail.appID);
      total += appAmount;
    });
    setFilterAmount(total);
  }, [subDetail, setFilterAmount]);

  const gettingFilterDate = (index) => {
    const appAccName = subDetail.find((app) => app.appID === index);
    return appAccName ? appAccName.date : "";
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
      {filterData
        .filter((filterItem) =>
          subDetail.some((detail) => detail.appID === filterItem.id)
        )
        .map((filteredItem, id) => (
          <div key={id}>
            <div className="flex flex-row justify-start gap-[5rem] items-center border-b-2 border-gray-600	rounded hover:bg-[#4d9ab6] bg-blur-lg p-3">
              <div className="flex flex-row items-center justify-start w-[168px] gap-2">
                <img
                  src={filteredItem.image}
                  className="max-w-[4rem] h-auto"
                  alt="appimage"
                ></img>
                <p className="text-[19px] max-w-[5rem] font-medium">
                  {filteredItem.name}
                </p>
              </div>
              <p className="w-[6rem]">
                {gettingFilterAccName(filteredItem.id)}
              </p>
              <p className="w-[6rem]">{gettingFilterAmount(filteredItem.id)}</p>
              <p className="w-[7rem]">
                {date(gettingFilterDate(filteredItem.id))}
              </p>
              <button className="text-[25px] ml-9"
                onClick={() =>
                  subDetail.map((detail) => {
                    if (filteredItem.id === detail.appID){
                      handleDel(detail._id);
                    }
                  })
                }
              >
                <MdDelete />
              </button>
              {/* in this button i first map the subdetail and check the index of the
            filtereditem and detail pass that id to delete that app  */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DashboardFilterTable;
