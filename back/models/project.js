const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

let projectSchema = new Schema({

    nameProject: {
        type: 'String', 
        required: 'You need to specifie the name of your project'
    }, 

    description: {
        type: 'string', 
        required: 'You need to specifie the description of your project' 
    }, 

    content: {
        type: 'string', 
        required: 'You need to specifie the content of your project'
    }, 

    image: {
        type: 'string'
    },

    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})

module.exports = mongoose.model('Project', projectSchema);