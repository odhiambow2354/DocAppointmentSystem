import express from "express";
import {
  getToken,
  stkPush,
  mpesaCallback,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router(); // Use paymentRouter, not 'router'

// Route for initiating STK Push
paymentRouter.post("/", getToken, stkPush);

// Route for handling M-Pesa callback
paymentRouter.post("/callback", mpesaCallback);

export default paymentRouter;
