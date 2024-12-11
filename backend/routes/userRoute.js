import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  payAppointment,
} from "../controllers/userControllers.js";
import {
  getToken,
  stkPush,
  mpesaCallback,
  pollTransactionStatus,
} from "../controllers/mpesaController.js";
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
userRouter.post("/pay-appointment", authUser, payAppointment);

// Endpoint to M-Pesa payment
userRouter.post("/stkpush", authUser, getToken, stkPush);
userRouter.post("/callback", mpesaCallback);
userRouter.post(
  "/poll:transactionId",
  authUser,
  getToken,
  pollTransactionStatus
);

export default userRouter;
