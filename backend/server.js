const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/db');
const UserRouter = require('./routes/auth.route');

connectToDB();
const app = express();
app.use(cors());
app.use(express.json());

//signup login
app.use("/users",UserRouter)


//test route
app.get("/test",(req,res)=>{
    res.status(200).json({message:"this is test route!"})
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port, ${PORT}`);
})