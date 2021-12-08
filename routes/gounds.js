const express = require('express')
const router = express.Router()
const config = require('../db/config')
const Ground = require('../models/ground')
const Review = require('../models/review')

router.get('/' ,async (req , res) =>{
    const grounds =await  Ground.find({})
    res.render('ground/view' , {grounds})
})
router.get('/new' , (req , res) =>{
    res.render('ground/new')
})
router.post('/new' ,async (req , res) =>{
    const newground =await new Ground(req.body).save()
    res.redirect('/grounds')
})
router.get('/:id' , async(req, res)=>{
    const {id} = req.params
    const ground = await Ground.findById(id)
    const pop = await ground.populate('reviews')
    res.render('ground/detailed' ,{pop , ground})
})
router.get('/:id/edit' , async(req, res)=>{
    const {id} = req.params
    const ground = await Ground.findById(id)
    res.render('ground/edit' ,{ground})
})
router.put('/:id/edit' , async(req, res)=>{
    const {id} = req.params
    await Ground.findByIdAndUpdate(id ,req.body )
    res.redirect(`/grounds/${id}`)
})
router.delete('/:id' , async(req,res)=>{
    const {id} = req.params;
    await Ground.findByIdAndDelete({_id:id})
    res.redirect('/grounds')
})

router.post('/:id/new', async(req, res)=>{
    const {id} = req.params;
    const ground =  await Ground.findById(id);
    const {review , star} = req.body;
    const newreview = await new Review({review,star}).save()
    const reviewadded = await ground.reviews.push(newreview)
    await ground.save();
    res.redirect(`/grounds/${id}`)
})

router.delete('/:id/review/:reviewid' , async(req, res)=>{
    const {id , reviewid} = req.params;
    await Ground.findByIdAndUpdate(id , {$pull:{reviews:reviewid}})
    await Review.findByIdAndDelete(reviewid)
    res.redirect(`/grounds/${id}`)
})

module.exports = router