const mongoose = require('mongoose');


const blackListSchema = mongoose.Schema({

    token:{type:String}

})

const BlackListModel = mongoose.model("blackList", blackListSchema)


module.exports = BlackListModel