const express = require('express')
const router = express.Router()
const config = require('../db/config')
const Ground = require('../models/ground')
const Review = require('../models/review')
const catchAsync = require('../err/catchAsync')
const ExpressError = require('../err/err')
const {reviewValidation , groundValidation} = require('../joiSchema/joi')
const passport = require('passport');
const {isLoggedIn,isAuthor,isReviewAuthor} = require('../middleware');
const grounds = require('../controller/ground')

router.get('/' ,catchAsync(grounds.index))


router.route('/new')
    .get(isLoggedIn,grounds.renderNewGround)
    .post(isLoggedIn,groundValidation,catchAsync(grounds.createNewGround))

router.route('/:id')
    .get(catchAsync(grounds.renderGround))
    .delete(isAuthor, catchAsync(grounds.deleteGround))

router.route('/:id/edit')
    .get(isLoggedIn,isAuthor, catchAsync(grounds.renderEdit))
    .put(isLoggedIn,isAuthor, catchAsync(grounds.updateGround))

// review routes

router.post('/:id/new',isLoggedIn,reviewValidation, catchAsync(grounds.createNewReview))

router.delete('/:id/review/:reviewid' ,isLoggedIn,isReviewAuthor, catchAsync(grounds.deleteReview))

module.exports = router