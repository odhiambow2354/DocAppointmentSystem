import jwt from "jsonwebtoken";

// User auth middleware
const authUser = async (req, res, next) => {
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

    req.body.userId = token_decoded.id;
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default authUser;
