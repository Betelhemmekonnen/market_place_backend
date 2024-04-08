const User=require('../models/userModel')
const bcrypt= require("bcryptjs");
const generateToken= require('../utils/generateToken');
const asyncHandler=require('../middleware/asyncHandler')
const RegisterUser = async (req, res) => {
	try{
		const token =  req.cookies.token
	     console.log("from register",token)
		console.log(req.body)
		//check if user already exist
         const user=await User.findOne({email:req.body.email})
		 if(user){
			return res.send({
				success:false,
				message:"user already exists"
			});
		 }
		 //hashed password
     const salt= await bcrypt.genSalt(10)
	 const hashedPassword=await bcrypt.hash(req.body.password,salt)
	 req.body.password=hashedPassword
    
	 //save user
      const newUser=new User(req.body)
	  await newUser.save();
	  res.send({
		success:true,
		message:"User created successfuly"
	  })
	} catch(error){
		res.send({
			success:false,
			message:error.message
		})
	}
  };

 const LoginUser=asyncHandler(async (req, res) =>{
    const user=await User.findOne({email:req.body.email})

	if(!user){
		throw newError("user not found")
	}
	const validpassword= await bcrypt.compare(
		req.body.password,
		user.password
	)
	if (!validpassword) {
		return res.status(401).send({ success: false, message: "Invalid password" });
	}
	generateToken(res, user._id);
	res.send({success:true,message:"user logged in successfully"})
 } )
  module.exports={RegisterUser,LoginUser}