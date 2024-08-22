const mongoose = require('mongoose')
const allMarksheet = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    fname: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    roll: {
        type: Number,
        require: true
    },
    rollc: {
        type: Number,
        require: true
    },
    hindi: {
        type: Number,
        require: true
    },
    sans: {
        type: Number,
        require: true
    },
    maths: {
        type: Number,
        require: true
    },
    ssc: {
        type: Number,
        require: true
    },
    sci: {
        type: Number,
        require: true
    },
    eng: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    }
})
const marksheet = mongoose.model('marksheet', allMarksheet)
module.exports = marksheet