import mongoose from "mongoose";

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB connected succesfully")
    } catch (error) {
        console.log("MongoDB not Connected");
    }
}
export default connectDB;


