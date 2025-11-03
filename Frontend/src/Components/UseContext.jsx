import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [userId, setId] = useState("");
  const [userEmail,setUserEmail]=useState("")

  return (
    <MyContext.Provider value={{ userId, setId ,userEmail,setUserEmail}}>
      {children}
    </MyContext.Provider>
  );
};
