const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'User'
    }
})

module.exports = mongoose.model('Review' , reviewSchema)