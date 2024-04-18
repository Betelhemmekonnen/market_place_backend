const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
async function isAuthenticated(req, res, next) {
  let token;
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You must log in." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.user = decoded;
    const user = await user.findOne({ _id: decoded.id});
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error!", error: error.message });
  }
}

async function isAdmin(req, res, next) {
  // console.log(req.user.role);
  if (req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Access denied, You must log as an ITAdmin.",
    });
  }
  next();
}
module.exports = {
	isAuthenticated,
	isAdmin,
}