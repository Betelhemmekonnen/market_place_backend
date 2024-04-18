const express=require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors =require('cors');
const app = express();
app.use(bodyParser.json());
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();
app.use(cors({origin:'http://localhost:3000',credentials:true}));
const dbConfig= require('./config/dbconfig')
const userRoute=require("./routes/userRoute")
app.use(cookieParser());
app.use(userRoute);
const port=process.env.PORT||5000;
app.listen(port,()=>console.log(`node Server started on ${port}`))