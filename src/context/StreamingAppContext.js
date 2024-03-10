import React, { useState, createContext } from "react";

import { data } from "../components/Data";

export const StreamingAppContext = createContext();

const StreamingAppContextProvider = ({ children }) => {
  const [filterAmount, setFilterAmount] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [currentAccount, setCurrentAccount] = useState("")
  return (
    <StreamingAppContext.Provider
      value={{
        data,
        filterData,
        setFilterData,
        filterAmount,
        setFilterAmount,
        notificationMessage,
        setNotificationMessage,currentAccount, setCurrentAccount,
      }}
    >
      {children}
    </StreamingAppContext.Provider>
  );
};

export default StreamingAppContextProvider;
