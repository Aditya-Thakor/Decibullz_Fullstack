import mongoose from "mongoose";


const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);

        console.log(`Mongodb connected : ${conn.connection.host} `)

    } catch (error) {
        console.log("Error at connecting MongoDb");
        console.log(error);
    }
};

export default connectDB;