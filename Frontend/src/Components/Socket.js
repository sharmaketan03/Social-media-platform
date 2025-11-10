import {io} from "socket.io-client"


const backend=import.meta.env.VITE_BACKEND_URL||import.meta.env.VITE_BACKEND_RENDER


const socket=io(backend,{
    withCredentials:true,
    transports:["websocket"]
});
export default socket;