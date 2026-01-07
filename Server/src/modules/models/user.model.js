const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },

    avatar: { 
        type: String, 
        default: "https://unsplash.com/s/photos/image" // Default placeholder
    },

    isDeactivated: {
        type: Boolean,
        default: false,
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);