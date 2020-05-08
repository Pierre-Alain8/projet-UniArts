const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

let projectSchema = new Schema({

    title: {
        type: 'string',
        required: true
    }, 

    description: {
        type: 'string', 
    }, 

    content: {
        type: 'string', 
        required: true
    }, 

    cover: {
        type: 'string'
    },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

module.exports = mongoose.model('Project', projectSchema);