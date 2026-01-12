const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

    chatName: {  //only for group
        type:String,
        trim: true,
    },

    isGroupChat: {
        type: Boolean,
        default: false,
    },
    
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    roomID :{
        type: String,
        trim: true
    },

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    chatAvatar: {  //only for group
        type: String,
        default: "https://unsplash.com/photos/woman-with-dslr-camera-e616t35Vbeg" // Default placeholder
    },

    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }

}, {timestamps: true})

module.exports = mongoose.model('Chat', chatSchema);