import React, { useState, useContext } from "react";
import AppDetail from "../components/AppDetail";
import { StreamingAppContext } from "../context/StreamingAppContext";
import { IoAddOutline } from "react-icons/io5";
// import { Link } from "react-router-dom";

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
    <div className="bg-[#4492ae] min-h-screen w-full font-secondary relative">
      <div className="ml-[5rem] mr-[5rem] pt-[3rem] flex flex-col gap-4 text-white mb-[3rem]">
        <h1 className="text-[27px] font-semibold text-black capitalize">
          Streaming Apps
        </h1>
        <div className="flex flex-row gap-4 items-center">
          <input
            placeholder="Search"
            onChange={handleInput}
            className="w-[47rem] p-2 pl-4 rounded-[20px] text-black outline-none"
          />
          <button
            onClick={handleSearch}
            className="hover:bg-[#48749f] bg-[#025db9b5] w-auto p-2 pr-3 flex flex-row items-center gap-2 rounded-[20px] "
          >
            <IoAddOutline className="text-xl" />
            <p>Search</p>
          </button>
        </div>

        {searchClicked && filterData.length >= 1 ? (
          <div className="mt-8 grid grid-cols-4 gap-8 ">
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
          <div className="mt-8 grid grid-cols-4 gap-8 ">
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
