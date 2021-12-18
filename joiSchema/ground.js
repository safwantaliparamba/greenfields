const joi = require('joi')
module.exports = (req,res,next) => {
    const groundSchema = joi.object({
        name:joi.string().required(),
        location:joi.string().required(),
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