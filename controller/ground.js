const Ground = require('../models/ground');
const Review = require('../models/review')

module.exports.index = async (req , res ,next) =>{
    req.flash('success' , 'successfully created')
    const grounds =await  Ground.find({}).populate('author')
    res.render('ground/view' , {grounds})
}

module.exports.renderNewGround =  (req , res) =>{
    res.render('ground/new')
}
module.exports.createNewGround = async (req , res ,next) =>{
    const newground =await new Ground(req.body)
    newground.author = req.user._id
    await  newground.save()
    req.flash('success','succesfully created new ground')
    res.redirect(`/grounds/${newground._id}`)
    
}
module.exports.renderGround = async(req, res,next)=>{
    const {id} = req.params
    const ground = await Ground.findById(id).populate('author')
    const reviews = await ground.populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    })
    res.render('ground/detailed' ,{reviews , ground})
}
module.exports.renderEdit = async(req, res ,next)=>{
    const {id} = req.params
    const ground = await Ground.findById(id)
    res.render('ground/edit' ,{ground})
}

module.exports.updateGround = async(req, res ,next)=>{
    const {id} = req.params
    await Ground.findByIdAndUpdate(id ,req.body )
    res.redirect(`/grounds/${id}`)
}

module.exports.deleteGround = async(req,res ,next)=>{
    const {id} = req.params;
    await Ground.findByIdAndDelete({_id:id})
    res.redirect('/grounds')
}

module.exports.createNewReview = async(req, res ,next)=>{
    const {id} = req.params;
    const ground =  await Ground.findById(id);
    const {review , rating} = req.body;
    const author = req.user
    const newreview = await new Review({review,rating,author}).save()
    const reviewadded = await ground.reviews.push(newreview)
    await ground.save();
    res.redirect(`/grounds/${id}`)
}

module.exports.deleteReview = async(req, res ,next)=>{
    const {id , reviewid} = req.params;
    await Ground.findByIdAndUpdate(id , {$pull:{reviews:reviewid}})
    await Review.findByIdAndDelete(reviewid)
    res.redirect(`/grounds/${id}`)
}