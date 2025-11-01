import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [userId, setId] = useState("");

  return (
    <MyContext.Provider value={{ userId, setId }}>
      {children}
    </MyContext.Provider>
  );
};
