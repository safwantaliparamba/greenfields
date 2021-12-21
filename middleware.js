const Ground = require('./models/ground')
const Review = require('./models/review')

module.exports.isLoggedIn = (req,res,next) =>{
    req.session.returnTo = req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash('error','You must be logged in')
        res.redirect('/login')
    }else{
        next()
    }
}

module.exports.isAuthor = async(req , res , next)=>{
    const {id} = req.params
    const ground = await Ground.findById(id)
    if(!ground.author.equals(req.user._id)){
        req.flash('error','You dont have permission!!')
        return res.redirect(`/grounds/${id}`)
    }
    next()
}

module.exports.isReviewAuthor = async(req , res , next)=>{
        const {id , reviewid} = req.params
        const review = await Review.findById(reviewid)
        if(!review.author.equals(req.user._id)){
            req.flash('error','You dont have permission!!')
            return res.redirect(`/grounds/${id}`)
        }
        next()
}