const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

let userSchema = new Schema({

    name : {
    type: 'string', 
    required: 'You need to specifie a name'
    }, 

    pseudo : {
        type: 'string', 
        required: 'You need to specifie a pseudo' 
    }, 

    email: {
        type: 'string', 
        required: 'You need to specifie a email',
        // match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        unique: true
    },  

    password: {
        type: 'string', 
        required: 'You need to specifie a password', 
        // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    },

    about: {
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
        enum: ['Admin', 'Artiste']
    }, 

    projectId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }], 

    linkId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Link"
    }], 



});

module.exports = mongoose.model('User', userSchema);