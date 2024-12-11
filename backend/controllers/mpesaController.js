import axios from "axios";
import dotenv from "dotenv";

// Configure dotenv to access environment variables
dotenv.config();

// Utility to generate timestamp in the required format
const generateTimestamp = () => {
  const date = new Date();
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(date.getDate()).padStart(2, "0")}${String(
    date.getHours()
  ).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(
    date.getSeconds()
  ).padStart(2, "0")}`;
};

// Utility to handle errors and send responses
const handleError = (error, res, message) => {
  console.error(message, error.message);
  res.status(400).json({ error: message, details: error.message });
};

// Middleware to fetch and cache access token
const getToken = async (req, res, next) => {
  const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString(
    "base64"
  );

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    req.token = response.data.access_token; // Store token for later use
    console.log("Access token:", req.token);
    next(); // Proceed to the next middleware (stkPush)
  } catch (error) {
    handleError(error, res, "Failed to fetch access token.");
  }
};

// Function to initiate STK Push
const stkPush = async (req, res) => {
  if (!req.token) {
    return res
      .status(400)
      .json({ error: "Token not available. Please retry." });
  }

  const { SHORT_CODE, PASS_KEY, CALLBACK_URL } = process.env;
  const phone = req.body.phone.substring(1); // Remove leading '0' from phone number
  const amount = req.body.amount;
  const timestamp = generateTimestamp();

  const password = Buffer.from(`${SHORT_CODE}${PASS_KEY}${timestamp}`).toString(
    "base64"
  );

  const data = {
    BusinessShortCode: SHORT_CODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: `254${phone}`, // Format phone number
    PartyB: SHORT_CODE,
    PhoneNumber: `254${phone}`,
    CallBackURL: CALLBACK_URL,
    AccountReference: "Test",
    TransactionDesc: "Test Transaction",
  };

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      data,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );
    console.log("STK Push Response:", response.data);
    res
      .status(200)
      .json({ message: "STK Push initiated", data: response.data });
  } catch (error) {
    handleError(error, res, "Failed to initiate STK Push.");
  }
};

// Function to handle M-Pesa callback and user actions
const mpesaCallback = async (req, res) => {
  const result = req.body.Body.stkCallback;
  console.log("STK Callback Result:", result);

  // Handle payment results
  if (result.ResultCode === 0) {
    console.log("Payment successful.");
    // Here you can update the status of the transaction in the database to 'completed'
    // Notify the user of successful payment
    res.status(200).json({ message: "Payment successful" });
  } else if (result.ResultCode === 1 || result.ResultCode === 2) {
    // Payment failed or canceled
    console.log("Payment failed or cancelled:", result.ResultDesc);
    // Here you can update the status of the transaction in the database to 'failed' or 'cancelled'
    // Notify the user of the failed/canceled payment
    res.status(200).json({ message: "Payment failed or canceled" });
  } else {
    console.log("Unknown result:", result.ResultDesc);
    res.status(200).json({ message: "Unknown payment status" });
  }
};

// Polling function to check payment status (if the user has ignored)
const pollTransactionStatus = async (transactionId, res) => {
  try {
    const { token } = req;
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
      {
        params: {
          token: token,
          transactionId: transactionId,
        },
      }
    );

    const result = response.data;
    console.log("Transaction status:", result);

    if (result.ResultCode === 0) {
      // Payment successful
      console.log("Payment successful!");
      // Update your database and notify the user about the successful payment
      res.status(200).json({ message: "Payment completed successfully" });
    } else {
      // Handle failed or canceled payment
      console.log("Payment failed or canceled:", result.ResultDesc);
      res.status(200).json({ message: "Payment failed or canceled" });
    }
  } catch (error) {
    console.error("Error checking transaction status:", error.message);
    res.status(500).json({ error: "Error polling transaction status" });
  }
};

export { getToken, stkPush, mpesaCallback, pollTransactionStatus };
