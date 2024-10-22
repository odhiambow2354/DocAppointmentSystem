import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("Connected to MongoDB")
  );
  await mongoose.connect(`${process.env.MONGODB_URI}/doctor_appointment_db`);
};

export default connectDB;
