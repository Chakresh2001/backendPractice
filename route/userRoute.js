const express = require('express');
const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const BlackListModel = require('../model/blackListmodel');


const userRoute = express.Router()



userRoute.post("/register", async(req,res)=>{
    try {
        const {name,email,password} = req.body
    
    const users = await UserModel.findOne({email:email})
  
    if(users){
        return res.status(400).json({error:"User Already Exsists"})
    }

    const user = await UserModel(req.body)

    bcrypt.hash(password, 10, function(err, hash) {
        
        user.password = hash

        user.save()

        res.status(200).json({message:"User Registered", user:user})

    });
    } catch (error) {
        res.json({error:"internal error"})
    }


})

userRoute.post("/login", async(req,res)=>{

    try {

        const {email, password} = req.body

        const user = await UserModel.findOne({email:email})
        if(!user){
            res.status(400).json({error:"User not Registered"})
        }
        

        bcrypt.compare(password, user.password, function(err, result) {
            if(!result){
                res.status(400).json({error:"Invalid Password"})
            }

            const token = jwt.sign({ userID : user._id, userName: user.name }, "123");

            res.json({message:"User Logged In", token:token})

        });

    } catch (error) {
        res.json({error:"internal error"})
    }


})

userRoute.post("/logout", async(req,res)=>{

    try {
        const token = req.headers.authorization

    if(!token){
        res.json({error:"Please Login"})
    }

    const black = BlackListModel({token:token})

    await black.save()

    res.json({message:"user Logged Out"})
    } catch (error) {
        res.json({error:"internal Error"})
    }

})

module.exports = userRoute