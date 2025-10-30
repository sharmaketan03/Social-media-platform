import mongoose from "mongoose"

export async  function  ConnectDB(req,res){
    try{
       await mongoose.connect(process.env.Mongoose_connect)
      console.log("User Connect")
    }catch(err){
        console.log("db is not connect")
    }
}
