const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    destination:{
        type:String,
        required:true
    },
    locations:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    days:{
        type:String,
        required:true
    },
    tourImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const tours = mongoose.model("tours",tourSchema)
module.exports = tours

