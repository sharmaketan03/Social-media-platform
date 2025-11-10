import { createContext, useState, useEffect } from "react";


export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [userId, setId] = useState("");
  const [userEmail,setUserEmail]=useState("")

  // Register socket with backend when userId becomes available
 
  return (
    <MyContext.Provider value={{ userId, setId ,userEmail,setUserEmail}}>
      {children}
    </MyContext.Provider>
  );
};
