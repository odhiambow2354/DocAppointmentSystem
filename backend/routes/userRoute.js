import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  initiatePayment,
} from "../controllers/userControllers.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

// Endpoint to register user
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

// Endpoint to initiate M-Pesa payment
userRouter.post("/initiate-payment", authUser, initiatePayment);

export default userRouter;
