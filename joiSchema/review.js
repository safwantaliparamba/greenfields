const joi = require('joi')
const ExpressError = require('../err/err')

module.exports = (req , res , next) => {
    const reviewSchema = joi.object({
        star:joi.number().required(),
        review:joi.string().required()
    })
    const result = reviewSchema.validate(req.body)
    if(result.error){
        throw new ExpressError(result.error,400)
    }else{
        next()
    }
}