const mongoose = require('mongoose');

// User registration schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
},{
    timestamps: true
});

// Create user model
const userModel = mongoose.model('user',userSchema);

module.exports = userModel;