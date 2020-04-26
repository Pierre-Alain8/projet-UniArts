const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

let projectSchema = new Schema({

    title: {
        type: 'string',
    }, 

    description: {
        type: 'string', 
    }, 

    content: {
        type: 'string', 
    }, 

    cover: {
        type: 'string'
    },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

module.exports = mongoose.model('Project', projectSchema);