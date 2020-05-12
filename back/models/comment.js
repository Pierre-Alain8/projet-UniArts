const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

let commentSchema = new Schema({

    pseudo: {
        type: 'string'
    }, 

    date: {
        type:'date',
        default: Date.now()
    },

    content: {
        type: 'string'
    },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

module.exports = mongoose.model('Comment', commentSchema);