const { Router } = require('express')
const mongoose = require('mongoose')

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    gender: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    
    jobTitle: {
        type: String,
    }
}, {timestamps: true})

//model
const User = mongoose.model('user', userSchema)


module.exports = User