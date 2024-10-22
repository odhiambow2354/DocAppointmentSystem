import jwt from "jsonwebtoken";

//admin auth middleware
const authAdmin = async (req, res, next) => {
  try {
    //get the token from the header if present
    const { adminToken } = req.headers;

    //if no token found
    if (!adminToken) {
      return res.json({ success: false, message: "Access Denied" });
    }

    //verify the token
    const token_decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
    if (
      token_decoded !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid token" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
