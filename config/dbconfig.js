const mongoose= require('mongoose');
mongoose.connect(process.env.mongo_url)
const connection = mongoose.connection;

connection.on("connected",()=>{
	console.log("mongodb connected successfully")
})
connection.on("error",(err)=>{
	console.log("mongodb connected Failed")
})
module.exports=connection;