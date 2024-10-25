import jwt from "jsonwebtoken";

// Admin auth middleware
const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Access Denied" });
    }

    // Extract the token part after "Bearer "
    const token = authHeader.split(" ")[1];

    // Verify the token
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decoded token matches admin credentials
    if (
      token_decoded.email !== process.env.ADMIN_EMAIL ||
      token_decoded.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid token" });
    }

    // Proceed to next middleware if token is valid
    next();
  } catch (error) {
    console.error("Error in authAdmin middleware:", error);
    return res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
