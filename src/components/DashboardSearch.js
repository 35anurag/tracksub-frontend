import React, { useContext } from "react";
import { StreamingAppContext } from "../context/StreamingAppContext";

const DashboardSearch = () => {

  const { data, setFilterData } = useContext(StreamingAppContext);

  const handleInput = (event) => {
    const newData = event.target.value;
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(newData.toLowerCase());
    });
    if (newData === "") {
      setFilterData("");
    } else {
      setFilterData(newFilter);
    }
  };

  return (
      <div className="flex flex-row lg:flex-col gap-1 justify-between">
        <label id="search" className="font-medium lg:block hidden text-[16px] lg:font-semibold lg:text-lg">
          Search:
        </label>
        <input
          type="text"
          className="text-black w-[15rem] h-[2rem] outline-none pl-2 rounded-md"
          id="search"
          onChange={handleInput}
          placeholder="Search..."
        />
      </div>
  );
};

export default DashboardSearch;
