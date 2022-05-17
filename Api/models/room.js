const mongoose = require('mongoose')


const roomSchema = new mongoose.Schema({


    title:{
        type:String,
        required:true
    },
    maxPeople:{
        type:Number,
        required:true
    },

    price:{
        type:Number,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    roomNumbers:[{number:Number, unavailableDates:[{type:[Date]}]}]
}, {timestamps:true})


const Room = mongoose.model('Room', roomSchema)
module.exports = Room