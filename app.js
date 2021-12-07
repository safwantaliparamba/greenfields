const express = require('express')
const app = express()
const path = require('path')
const engine = require('ejs-mate')
const session = require('express-session')
const mongoose = require('mongoose')

// routes
const grounds = require('./routes/gounds')

app.set('view engine', 'ejs')
app.set('views' , path.join(__dirname, 'views'))
app.engine('ejs' , engine)
app.use(express.static(path.join(__dirname, 'assets')))
app.use(session({ secret:'imnotabitch'}))
app.use(express.urlencoded({extended:true}))

app.get('/' , (req, res) => {
    const error = false
    const success = false
    res.render('landingpage' , {error , success})
})
app.use('/grounds', grounds)


app.listen(3000 , ()=>{
    console.log('listening on port 3000');
})