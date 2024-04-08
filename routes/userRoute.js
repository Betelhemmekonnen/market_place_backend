const express=require("express")
const router=express.Router();
const {RegisterUser,LoginUser} = require("../controller/userController")
router.post("/registeruser", RegisterUser);
router.post("/loginuser",LoginUser)
module.exports = router;