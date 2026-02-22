import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("kết nối cơ sở dữ liệu thành công");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
