const mongoose = require('mongoose')


const connection = {}

const ConnectToDatabase = async(req, res)=>{
    if(connection.isConnected){
        console.log("database connected")
        return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })

    connection.isConnected = db.connections[0].readyState
}



export default ConnectToDatabase