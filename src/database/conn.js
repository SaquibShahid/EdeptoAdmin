const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/edeptoAdmin').then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log("connection error: " + err);
})