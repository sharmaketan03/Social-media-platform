import React from 'react'
import socket from './Components/Socket.js'
import { useEffect } from 'react'
import ReactRouter from './Components/React-router'
function App() {
useEffect(()=>{
    socket.on("connect",()=>{
     console.log("SOcket Connected",socket.id)
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