import React, { useContext } from 'react'
import socket from './Components/Socket.js'
import { useEffect } from 'react'
import ReactRouter from './Components/React-router'
import { MyContext } from './Components/UseContext.jsx'
function App() {

  let {userId}=useContext(MyContext)--
  useEffect(()=>{
    
    const onConnect = () => {
      console.log("Socket Connected", socket.id);
      if (userId) {
        socket.emit("register", userId);
        console.log("📤 Registered user to socket:", userId);
      }
    };

    const onDisconnect = () => {
      console.log("Socket Disconnected");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return ()=>{
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    }
  }, [userId])

  return (
   <ReactRouter/>
  )
}

export default App