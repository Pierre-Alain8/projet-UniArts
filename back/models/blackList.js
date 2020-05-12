const mongoose = require('mongoose');

let BlackList = new mongoose.Schema({
    token: {
        type: String
    }
}); 

mongoose.exports = mongoose.model('Blacklist', BlackList)