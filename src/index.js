import React from "react";
import ReactDOM from "react-dom/client";
import StreamingAppContextProvider from "./context/StreamingAppContext";
import "./index.css"

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StreamingAppContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StreamingAppContextProvider>
);
