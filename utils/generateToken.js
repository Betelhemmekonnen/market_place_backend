const jwt=require("jsonwebtoken")
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // set JWT as HTTP-only cookie
  res
  .cookie("token", token, {
	httpOnly: true,
	sameSite: "none",
	secure: true,
	path: "/",
	// domain: 'blogging-production-7db1.up.railway.app'
  })
};

module.exports= generateToken;