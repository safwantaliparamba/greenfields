const express = require('express');
const router = express.Router();
const catchAsync = require('../err/catchAsync')
const User = require('../models/user');
const passport = require('passport')

router.get('/', function(req, res){
    res.render('landingpage')
})
router.get('/register',(req,res)=>{
    res.render('user/register')
})
router.post('/register',async(req,res)=>{
    try {
        const {email,username,password} = req.body
        const user = new User({email, username});
        const regUser = await User.register(user,password)
        req.logIn(regUser,err=> {
            if(err) return next(err)
            console.log(req.user);
            req.flash('success','successfully registered');
            res.redirect('/grounds')
        })
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/register')
    }
})
router.get('/login',(req,res)=>{
    res.render('user/login')
})
router.post('/login',passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}),async(req,res)=>{
    try{
    const redirectUrl = req.session.returnTo || '/grounds'
    delete req.session.returnTo
    req.flash('success','welcome back')
    res.redirect(redirectUrl)
    }
    catch(error) {
        req.flash('error',error.message);
        res.redirect('/login')
    }
})
router.get('/logout',(req,res)=>{
    req.logOut()
    req.flash('success','successfully logged out')
    res.redirect('/grounds')
})

module.exports = router