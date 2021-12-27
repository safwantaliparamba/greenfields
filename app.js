if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express')
const app = express()
const path = require('path')
const engine = require('ejs-mate')
const session = require('express-session')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const catchAsync = require('./err/catchAsync')
const ExpressError = require('./err/err')
const joi = require('joi')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const User = require('./models/user')
const passport = require('passport')
const Localstrategy = require('passport-local')
// const mongoSanitize = require('mongo-sanitize')
// const multer = require('multer')
// const { storage } = require('./cloudinary/index')
// const upload = multer({storage})


// imported routes
const groundsRouter = require('./routes/gounds');
const indexRouter = require('./routes/index');

// template engine setup 
app.set('view engine', 'ejs')
app.set('views' , path.join(__dirname, 'views'))
app.engine('ejs' , engine)

// middlewares
// app.use(mongoSanitize)
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(cookieParser());
app.use(session({
    secret:'thisisjustasecret',
    resave:true,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 1000*60*60*24*7,
        secure: false,
        maxAge:845000
    }
}))


// passport middlewares
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// flash middleware
app.use(flash())
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    // console.log(req.session)
    next();
})


// routes 
app.use('/',indexRouter);
app.use('/grounds',groundsRouter)

app.all('*' , (req, res ,next) => {
    next( new ExpressError('page not found' , 500))
})

app.use((err , req , res , next) =>{
    const {message='something went wrong' , statusCode = 500 ,stack} = err;
    res.status(statusCode).render('404' , {message , stack})
})

app.listen( 3000, ()=>{
    console.log(`listening on port 3000`);
})