import React, { useContext } from 'react'
import socket from './Components/Socket.js'
import { useEffect } from 'react'
import ReactRouter from './Components/React-router'
import { MyContext } from './Components/UseContext.jsx'
function App() {

  let {userId}=useContext(MyContext)
useEffect(()=>{
    socket.on("connect",()=>{
     console.log("SOcket Connected",socket.id)


      if(userId){
       socket.emit("register_user",userId)
             console.log("📤 Registered user to socket:", userId);
    }


    })
   
    socket.on("disconnect",()=>{
      console.log("SOcket Disconnected")
    })

    return ()=>{
      socket.off("connect")
      socket.off("disconnect")
    }
},[])

  return (
   <ReactRouter/>
  )
}

export default App