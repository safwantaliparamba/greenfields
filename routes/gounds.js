const express = require('express')
const router = express.Router()
const config = require('../db/config')
const Ground = require('../models/ground')
const Review = require('../models/review')
const catchAsync = require('../err/catchAsync')
const ExpressError = require('../err/err')
const {reviewValidation , groundValidation} = require('../joiSchema/joi')
const passport = require('passport');
const {isLoggedIn,isAuthor,isReviewAuthor} = require('../middleware')


router.get('/' ,catchAsync(async (req , res ,next) =>{
    req.flash('success' , 'successfully created')
    const grounds =await  Ground.find({}).populate('author')
    res.render('ground/view' , {grounds})
}))


router.get('/new' ,isLoggedIn, (req , res) =>{
    res.render('ground/new')
})


router.post('/new',isLoggedIn,groundValidation,async (req , res ,next) =>{
        const newground =await new Ground(req.body)
        newground.author = req.user._id
        await  newground.save()
        req.flash('success','succesfully created new ground')
        res.redirect(`/grounds/${newground._id}`)
        
})


router.get('/:id' , catchAsync(async(req, res,next)=>{
    const {id} = req.params
    const ground = await Ground.findById(id).populate('author')
    const reviews = await ground.populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    })
    console.log(reviews,ground)
    res.render('ground/detailed' ,{reviews , ground})
}))


router.get('/:id/edit' ,isLoggedIn,isAuthor, catchAsync(async(req, res ,next)=>{
    const {id} = req.params
    const ground = await Ground.findById(id)
    res.render('ground/edit' ,{ground})
}))


router.put('/:id/edit' ,isLoggedIn,isAuthor, catchAsync(async(req, res ,next)=>{
    const {id} = req.params
    await Ground.findByIdAndUpdate(id ,req.body )
    res.redirect(`/grounds/${id}`)
}))


router.delete('/:id' ,isAuthor, catchAsync(async(req,res ,next)=>{
    const {id} = req.params;
    await Ground.findByIdAndDelete({_id:id})
    res.redirect('/grounds')
}))

// review routes

router.post('/:id/new',isLoggedIn,reviewValidation, catchAsync(async(req, res ,next)=>{
    const {id} = req.params;
    const ground =  await Ground.findById(id);
    const {review , rating} = req.body;
    const author = req.user
    const newreview = await new Review({review,rating,author}).save()
    const reviewadded = await ground.reviews.push(newreview)
    await ground.save();
    res.redirect(`/grounds/${id}`)
}))



router.delete('/:id/review/:reviewid' ,isLoggedIn,isReviewAuthor, catchAsync(async(req, res ,next)=>{
    const {id , reviewid} = req.params;
    await Ground.findByIdAndUpdate(id , {$pull:{reviews:reviewid}})
    await Review.findByIdAndDelete(reviewid)
    res.redirect(`/grounds/${id}`)
}))

module.exports = router