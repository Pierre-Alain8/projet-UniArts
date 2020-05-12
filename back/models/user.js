const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

let userSchema = new Schema({

    firstName : {
        type: 'string', 
        required: true
    }, 

    lastName : {
        type: 'string', 
        required: true
        }, 

    pseudo : {
        type: 'string'
    }, 

    email: {
        type: 'string', 
        required: true,
        unique: true
    },  

    password: {
        type: 'string', 
        required: true,
    },

    about: {
        type: 'string',
    },

    avatar: {
        type: 'string',
    },

    date_register: { 
        type: 'date', 
        default: Date.now()
    }, 

    adhesion: {
        type: 'boolean', 
        default: false

    }, 

    role: {
        type: 'string', 
        enum: ['Admin', 'Artiste'],
        default: 'Artiste'
    }, 

    projectId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }], 

    linkId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Link"
    }],

    articleId: [{
        type: mongoose.Schema.Types.ObjectId,  
        ref: "Article"
    }]
});

module.exports = mongoose.model('User', userSchema);