const express = require('express');
const router = express.Router();
const catchAsync = require('../err/catchAsync')
const User = require('../models/user');
const passport = require('passport')
const index = require('../controller/index')
const {ifLoggedIn} = require('../middleware')

router.get('/',index.index )

router.route('/register')
    .get(ifLoggedIn,index.renderRegisterForm)
    .post(catchAsync(index.registerUser))

router.route('/login')
    .post(passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}),index.loginUser)
    .get(ifLoggedIn,index.renderLoginForm)

router.get('/logout',index.logout)

module.exports = router