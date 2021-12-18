const express = require('express')
const router = express.Router()
const config = require('../db/config')
const Ground = require('../models/ground')
const Review = require('../models/review')
const catchAsync = require('../err/catchAsync')
const ExpressError = require('../err/err')
const groundValidation = require('../joiSchema/ground')
const reviewValidation = require('../joiSchema/review')

router.get('/' ,catchAsync(async (req , res ,next) =>{
    req.session.count = 0
    req.flash('success' , 'successfully created')
    const grounds =await  Ground.find({})
    res.render('ground/view' , {grounds})
}))
router.get('/new' , (req , res) =>{
    res.render('ground/new')
})
router.post('/new' ,groundValidation,catchAsync(async (req , res ,next) =>{
    const newground =await new Ground(req.body).save()
    res.redirect('/grounds')
}))
router.get('/:id' , catchAsync(async(req, res,next)=>{
    let c = req.session.count++
    const {id} = req.params
    const ground = await Ground.findById(id)
    const pop = await ground.populate('reviews')
    res.render('ground/detailed' ,{pop , ground})
}))
router.get('/:id/edit' , catchAsync(async(req, res ,next)=>{
    const {id} = req.params
    const ground = await Ground.findById(id)
    res.render('ground/edit' ,{ground})
}))
router.put('/:id/edit' , catchAsync(async(req, res ,next)=>{
    const {id} = req.params
    await Ground.findByIdAndUpdate(id ,req.body )
    res.redirect(`/grounds/${id}`)
}))
router.delete('/:id' , catchAsync(async(req,res ,next)=>{
    const {id} = req.params;
    await Ground.findByIdAndDelete({_id:id})
    res.redirect('/grounds')
}))


// review routes

router.post('/:id/new',reviewValidation, catchAsync(async(req, res ,next)=>{
    const {id} = req.params;
    const ground =  await Ground.findById(id);
    const {review , star} = req.body;
    const newreview = await new Review({review,star}).save()
    const reviewadded = await ground.reviews.push(newreview)
    await ground.save();
    res.redirect(`/grounds/${id}`)
}))

router.delete('/:id/review/:reviewid' , catchAsync(async(req, res ,next)=>{
    const {id , reviewid} = req.params;
    await Ground.findByIdAndUpdate(id , {$pull:{reviews:reviewid}})
    await Review.findByIdAndDelete(reviewid)
    res.redirect(`/grounds/${id}`)
}))

module.exports = router