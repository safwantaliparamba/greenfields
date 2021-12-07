const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/greenfield')
.then(()=>{
    console.log('database connection established');
})
.catch(err => console.log('database connection error'))

