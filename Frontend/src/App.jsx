import React, { useContext } from "react";
import { MyContext } from "./Components/UseContext";
import ReactRouter from "./Components/React-router";
import  socket  from "./AllInnerComponents/socket";
import { useEffect } from "react";


function App() {
  const { userId } = useContext(MyContext);

 useEffect(()=>{
    if(userId){
      socket.emit("add-user",userId);
    }
 },[])


  return (
    <>
    
      <ReactRouter />
    </>
  );
}

export default App;
