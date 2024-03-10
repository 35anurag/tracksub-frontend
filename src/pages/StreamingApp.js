import React, { useState, useContext } from "react";
import AppDetail from "../components/AppDetail";
import { StreamingAppContext } from "../context/StreamingAppContext";
import { IoAddOutline } from "react-icons/io5";

const StreamingApp = () => {
  const [clicked, setClicked] = useState("");
  const [toggleDetail, isToggleDetail] = useState(false);
  const [input, setInput] = useState("");
  const [searchClicked, isSearchClicked] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const { data } = useContext(StreamingAppContext);

  const handleClick = (id) => {
    isToggleDetail(true);
    setClicked((targettedid) => (id === targettedid ? null : id));
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = () => {
    const filteredData = data.filter((value) => {
      return value.name.toLowerCase().includes(input.toLowerCase());
    });

    if (input.length === 0) {
      setFilterData("");
      isSearchClicked(false);
    } else {
      setFilterData(filteredData);
      isSearchClicked(true);
    }
  };
  return (
    <div className="bg-[#1d1d20] min-h-screen w-full lg:ml-[15rem] font-secondary relative">
      <div className="ml-[2rem] mr-[2rem] pt-[1rem] md:mr-[3rem] md:pt-[2rem] gap-3 md:ml-[3rem] lg:ml-[5rem] lg:mr-[5rem] lg:pt-[3rem] flex flex-col lg:gap-4 text-white lg:mb-[3rem]">
        <h1 className="text-[23px] md:text-[24px] lg:text-[25px] font-semibold text-white capitalize">
          Streaming Apps
        </h1>
        <div className="flex flex-row gap-2 lg:gap-4 items-center">
          <input
            placeholder="Search"
            onChange={handleInput}
            className="w-[40rem] pl-2 p-1 md:p-1 lg:w-[47rem] lg:p-2 lg:pl-4 rounded-[20px] text-black outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-[#48749f] hover:bg-[#025db9b5] w-auto p-1 lg:p-2 pr-2 flex flex-row items-center gap-1 lg:gap-1 rounded-[20px] "
          >
            <IoAddOutline className="text-[15px] lg:text-xl" />
            <p className="text-[13px] lg:text-[15px]">Search</p>
          </button>
        </div>

        {searchClicked && filterData.length >= 1 ? (
          <div className="mt-4 lg:mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {filterData.map((app) => (
              <div key={app.id}>
                <div className="">
                  <button onClick={() => handleClick(app.id)}>
                    <img
                      src={app.image}
                      alt="images"
                      className="w-[13rem] h-[8rem] rounded-lg hover:opacity-75"
                    />
                    <p className="text-left font-semibold text-sm">
                      {app.name}
                    </p>
                    {/* <p>delete</p> */}
                  </button>
                  {toggleDetail && (
                    <div>
                      {clicked === app.id && (
                        <div className="absolute z-10 top-0 left-0 right-0 w-full">
                          <AppDetail
                            index={app.id}
                            image={app.image}
                            isToggleDetail={isToggleDetail}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 grid-cols-2 md:grid-cols-4 lg:mt-8 grid lg:grid-cols-4 gap-8 ">
            {data.map((app) => (
              <div key={app.id}>
                <div className="">
                  <button onClick={() => handleClick(app.id)}>
                    <img
                      src={app.image}
                      alt="images"
                      className="w-[13rem] h-[8rem] rounded-lg hover:opacity-75"
                    />
                    <p className="text-left font-semibold text-sm">
                      {app.name}
                    </p>
                    {/* <p>delete</p> */}
                  </button>
                  {toggleDetail && (
                    <div>
                      {clicked === app.id && (
                        <div className="absolute z-10 top-0 left-0 right-0 w-full">
                          <AppDetail
                            index={app.id}
                            image={app.image}
                            isToggleDetail={isToggleDetail}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamingApp;
