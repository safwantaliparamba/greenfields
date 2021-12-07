const express = require('express')
const router = express.Router()
const config = require('../db/config')
const Ground = require('../models/ground')

router.get('/' ,async (req , res) =>{
    const grounds =await  Ground.find({})
    console.log(grounds)
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
    res.send(ground)
})

module.exports = router