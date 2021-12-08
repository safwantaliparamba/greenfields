const express = require('express')
const app = express()
const path = require('path')
const engine = require('ejs-mate')
const session = require('express-session')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

// imported routes
const groundsRouter = require('./routes/gounds');
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs')
app.set('views' , path.join(__dirname, 'views'))
app.engine('ejs' , engine)

// middlewares
app.use(express.static(path.join(__dirname, 'assets')))
app.use(session({ secret:'imnotabitch'}))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

// routes
app.use('/',indexRouter);
app.use('/grounds',groundsRouter)

app.listen(3000 , ()=>{
    console.log('listening on port 3000');
})