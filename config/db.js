const mongoose = require('mongoose');
require('dotenv').config();

const connectToServer = async()=>{

    await mongoose.connect(process.env.MONGODB_SERVER)

    console.log("server is connected")

}

module.exports = connectToServer