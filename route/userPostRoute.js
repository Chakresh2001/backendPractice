const express = require('express');
const UserModel = require('../model/userModel');
const auth = require('../middleware/auth');
const USerPostModel = require('../model/userPostmodel');


const userPostRoute = express.Router()


userPostRoute.post("/add", auth, async(req,res)=>{

    try {
         const {userID, userName} = req.userInfo

         const post = USerPostModel(req.body)
     
         post.user_name = userName
         post.user_id = userID
     
         await post.save()
     
         res.json({message:"Post Added", post:post})
    } catch (error) {
        res.json({error:"internal error"})
    }
    
    
})


userPostRoute.get("/get", auth, async(req,res)=>{
    
    try {

        const {userID} = req.userInfo

        const posts = await USerPostModel.find({user_id:userID})

        res.json({posts:posts})
        
    } catch (error) {
        res.json({error:"internal error"})
        
    }

})
userPostRoute.get("/get/:id", auth, async(req,res)=>{
    
    try {

        const {id} = req.params

        const post = await USerPostModel.findById(id)

        res.json({post:post})
        
    } catch (error) {
        res.json({error:"internal error"})
        
    }

})

userPostRoute.patch("/patch/:id", auth, async(req,res)=>{

    try {
        
        const {id} = req.params

        const updatedPost = await USerPostModel.findByIdAndUpdate(id, req.body)

        res.json({message:updatedPost, success:"Post has been Updated"})

    } catch (error) {
        res.json({error:"internal error"})
    }

})
userPostRoute.delete("/delete/:id", auth, async(req,res)=>{

    try {
        
        const {id} = req.params

        const {userID} = req.userInfo

        const updatedPost = await USerPostModel.findByIdAndDelete(id)
        if(!updatedPost){
            res.json({error:"Post Does Not Exsist"})
        }
        const newPosts = await USerPostModel.find({user_id:userID})

        res.json({success:"Post has been Deleted", newPosts:newPosts})

    } catch (error) {
        res.json({error:"internal error"})
    }

})

module.exports = userPostRoute