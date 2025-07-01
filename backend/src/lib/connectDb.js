import mongoose from 'mongoose';

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to MongoDB ${conn.connection.host}`)
    } catch(e){
        console.log("Error in Connecting Database",e)
        process.exit(1)
    }
}

export default connectDb;