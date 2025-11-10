import UserAuth from "../Models/Profile.js";

export async function socketHandler(io) {
  console.log("🟣 socketHandler attached"); // check ye print hota hai?
  io.on("connection", (socket) => {
    console.log("✅ Connected:", socket.id);

   socket.on("send follow-request",async(data)=>{
        console.log("send follow-request",data)

        let {senderId,reciverId}=data

        console.log(senderId,reciverId)

        io.to(reciverId).emit("receive_follow_request",{
            senderId,
            message:`${senderId} sent you a follow request.`

        })

         await UserAuth.findByIdAndUpdate(reciverId,{
            $push:{followRequests:senderId}
         })
   })




  });
}
