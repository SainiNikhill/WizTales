require("dotenv").config();

const mongoose= require ("mongoose")
const {DB_NAME} = require ("./constants")

const connectDb = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB_HOST:${connectionInstance}`)
    }
    catch(error){
        console.log("mongoDB connection error", error)
        process.exit(1)
    }
}
module.exports = connectDb