import axios from "axios";

let token; // Properly define token as a global variable

// Generate Token Middleware
const getToken = async (req, res, next) => {
  const secret =
    "Y0uaCAAPwwTsGtLHQi8pGPDjM2A5WQX7EcxcjlIfcIA05yRnt0ezftTKOFM9wuGC";
  const consumer = "lexOJoA1VBpYru6GpdIsd4KHJhOXE0kyW7fX1eJa2aEMP3kw";
  const auth = Buffer.from(`${consumer}:${secret}`).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    token = response.data.access_token;
    console.log("Access token:", token);
    next();
  } catch (error) {
    console.error("Error fetching token:", error.message);
    res.status(500).json({ error: "Failed to retrieve access token" });
  }
};

// STK Push Function
const stkPush = async (req, res) => {
  if (!token) {
    return res.status(400).json({ error: "Token not available" });
  }

  const shortCode = 174379;
  const phone = req.body.phone?.substring(1);
  const amount = req.body.amount;
  const passKey =
    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const date = new Date();
  const timestamp = `${date.getFullYear()}${String(
    date.getMonth() + 1
  ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}${String(
    date.getHours()
  ).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(
    date.getSeconds()
  ).padStart(2, "0")}`;
  const password = Buffer.from(`${shortCode}${passKey}${timestamp}`).toString(
    "base64"
  );

  const data = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: `254${phone}`,
    PartyB: shortCode,
    PhoneNumber: `254${phone}`,
    CallBackURL: "https://yourdomain.com/api/payment/callback",
    AccountReference: "Test",
    TransactionDesc: "Test Transaction",
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("STK Push Response:", response.data);
    res
      .status(200)
      .json({ message: "STK Push Initiated", data: response.data });
  } catch (error) {
    console.error("Error in STK Push:", error.message);
    res.status(400).json({ error: "STK Push request failed" });
  }
};

// Handle M-Pesa callback from Safaricom
const mpesaCallback = (req, res) => {
  const result = req.body.Body?.stkCallback;
  console.log("STK Callback Result:", result);

  if (result?.ResultCode === 0) {
    console.log("Payment Successful");
  } else {
    console.log(
      "Payment Failed or Cancelled:",
      result?.ResultDesc || "Unknown error"
    );
  }

  res.status(200).json({ message: "Callback received" });
};

export { getToken, stkPush, mpesaCallback };
