const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

let linkSchema = new Schema({

    linkTitle: {
        type: 'String', 
        required: 'You need to specifie the name of your link'
    }, 

    linkContent: {
        type: 'string', 
        required: 'You need to specifie the adress of your link'
    }, 

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Link', linkSchema);