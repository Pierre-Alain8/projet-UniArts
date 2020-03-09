const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

let userSchema = new Schema({

    name : {
    type: 'String', 
    required: 'You need to specifie a name'
    }, 

    pseudo : {
        type: 'String', 
        required: 'You need to specifie a pseudo' 
    }, 

    email: {
        type: 'String', 
        required: 'You need to specifie a email',
        match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        unique: true
    },  

    password: {
        type: 'String', 
        required: 'You need to specifie a password'
    }, 

    date_register: { 
        type: 'date', 
        default: Date.now()
    }, 

    adhesion: {
        type: 'boolean'

    }, 

    role: {
        type: 'string', 
        enum: ['Admin', 'Artiste']
    }

});

module.exports = mongoose.model('User', userSchema);