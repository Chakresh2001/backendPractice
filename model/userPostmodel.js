const mongoose = require('mongoose');


const userPostSchema = mongoose.Schema({

   user_name : {type:String},
   user_id : {type:String},
   title:{type:String, required:true},
   body:{type:String, required:true}

})

const USerPostModel = mongoose.model("Posts", userPostSchema)


module.exports = USerPostModel