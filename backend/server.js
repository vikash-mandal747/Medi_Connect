const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/db');

connectToDB()
const app = express();
app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port, ${PORT}`);
})