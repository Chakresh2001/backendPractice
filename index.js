const express = require('express');
const connectToServer = require('./config/db');
require('dotenv').config();
const userRoute = require("./route/userRoute");
const userPostRoute = require('./route/userPostRoute');

const app = express()

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Welcome To Final Practice")
})


app.use("/user", userRoute)

app.use("/posts", userPostRoute)


app.listen(8080, connectToServer())