import { createContext, useState } from "react";

export const StoreContext = createContext();

export const GlobleVar = ({ children }) => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    userId: "",
    create_time: "",
    token: ""
  });

  const backEndUrl = "http://localhost:3000";
  const fontEndUrl = "http://localhost:7777";
  const headers = { 'Content-Type': 'application/json' };

  const store = {
    GloUserData: [userData, setUserData],
    GloBackEndUrl: backEndUrl,
    GloFontEndUrl: fontEndUrl,
    Gloheaders: headers,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default GlobleVar;
