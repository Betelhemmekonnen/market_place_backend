const User=require('../models/userModel')
const bcrypt= require("bcryptjs");
const generateToken= require('../utils/generateToken');
const asyncHandler=require('../middleware/asyncHandler')
const RegisterUser = async (req, res) => {
	try{
         const user=await User.findOne({email:req.body.email})
		 if (user) {
			res.status(401);
			throw new Error("User already exists");
		  }
		 //hashed password
     const salt= await bcrypt.genSalt(10)
	 const hashedPassword=await bcrypt.hash(req.body.password,salt)
	 req.body.password=hashedPassword
    
	 //save user
      const users=new User(req.body)
	  await users.save();
	  const userInfo={
		 username:users.username,
	     email:users.email,
		 role:users.role,
		 status:users.status

	  }
	  res.status(201).json({
		success:true,
		message: "User account created successfully",
		userInfo,
	  });
	} catch(error){
		res.send({
			success:false,
			message:error.message,
		})
	}
  };

 const LoginUser=asyncHandler(async (req, res) =>{
	console.log(req.body)
    const user=await User.findOne({email:req.body.email})
   
	if(!user){
		console.log("user not found")
	}
	const validpassword= await bcrypt.compare(
		req.body.password,
		user.password
	)
	if (!validpassword) {
		return res.status(401).send({ success: false, message: "Invalid password" });
	}
	generateToken(res, user._id);
	const username=user.username
	const email=user.email
	const role=user.role
	const userInfo={username,email,role}
	res.status(201).json({success:true,
		message:"user logged in successfully ",
		userInfo
	})
 } )
  module.exports={RegisterUser,LoginUser}