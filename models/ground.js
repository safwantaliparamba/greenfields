const mongoose = require('mongoose');
const Review = require('./review')

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
    location:{
        type:String,
    },
    description:{
        type:String,
    },
    category:{
        type:String
    },
    author:{
        type:String
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId , 
            ref:'Review'
        }
    ]

})

groundSchema.post('findOneAndDelete' ,async (ground)=>{
    if(ground.reviews.length){
        const res = await Review.deleteMany({_id:{$in:ground.reviews}})
        console.log(res)
    }
})

module.exports = mongoose.model('Ground' , groundSchema)