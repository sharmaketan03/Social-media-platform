import React, { useContext } from "react";
import { MyContext } from "./Components/UseContext";
import ReactRouter from "./Components/React-router";


function App() {
  const { userId } = useContext(MyContext);

  return (
    <>
    
      <ReactRouter />
    </>
  );
}

export default App;
