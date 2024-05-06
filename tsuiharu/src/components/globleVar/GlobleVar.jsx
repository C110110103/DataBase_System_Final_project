import { createContext, useState } from "react";

export const StoreContext = createContext();

export const GlobleVar = ({ children }) => {
  const [haveToken, setHaveToken] = useState(true);
  const [userPermission, setUserPermission] = useState("");
  const [data, setData] = useState({
    userName: "",
    email: "",
    role: "",
    password: "",
    id: "",
  });

  const backEndUrl = "http://localhost:3000";
  const fontEndUrl = "http://localhost:5173";
  const headers = { 'Content-Type': 'application/json' };

  const store = {
    HaveToken: [haveToken, setHaveToken],
    userPermission: [userPermission, setUserPermission],
    userData: [data, setData],
    GloBackEndUrl: backEndUrl,
    GloFontEndUrl: fontEndUrl,
    Gloheaders: headers,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default GlobleVar;
