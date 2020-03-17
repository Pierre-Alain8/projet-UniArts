const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

let linkSchema = new Schema({

    titleLink: {
        type: 'String', 
        required: 'You need to specifie the name of your link'
    }, 


    content: {
        type: 'string', 
        required: 'You need to specifie the adress of your link'
    }, 

    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})

module.exports = mongoose.model('Link', linkSchema);