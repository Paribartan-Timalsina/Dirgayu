const express= require('express')
const path= require('path')
//const session = require("express-session")
const dotenv= require('dotenv')
const body_parser =require('body-parser')
const connectDB= require('./config/db')
//const passport=require("passport")
const cors=require('cors')
const router=require('./Router/routes')

dotenv.config({path:'./config/config.env'})

connectDB();


const Doctor=require('./models/Schema1')
//const ITEMS=require('./models/userschema2')

const app=express() 



app.use(cors({
  origin:"http://localhost:3000",
// credentials:true
 }
  
));



app.use(body_parser.json()) // for parsing application/json
app.use(body_parser.urlencoded({ extended: true }))

app.use( '/',router)

const PORT=process.env.PORT
const http=require("http")
const server = http.createServer(app);
app.listen(PORT,()=>console.log(`server is running in ${PORT} MODE `))
