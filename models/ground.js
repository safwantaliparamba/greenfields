const mongoose = require('mongoose');

const groundSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    category:{
        type:String
    }

})

module.exports = mongoose.model('Ground' , groundSchema)