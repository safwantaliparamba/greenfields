const joi = require('joi')
const ExpressError = require('../err/err')



module.exports.reviewValidation = (req , res , next) => {
    const reviewSchema = joi.object({
        rating:joi.number().required(),
        review:joi.string().required()
    })
    const result = reviewSchema.validate(req.body)
    if(result.error){
        throw new ExpressError(result.error,400)
    }else{
        next()
    }
}

module.exports.groundValidation = (req,res,next) => {
    const groundSchema = joi.object({
        name:joi.string().required(),
        location:joi.string().required(),
        number:joi.number().required(),
        price:joi.number().required(),
        image:joi.string().required(),
        description:joi.string().required(),
        category:joi.string().required()
    })
    const result = groundSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(result.error , 400);
    }else{
        next()
    }
}