const mongoose = require('mongoose');

let gallerySchema = new mongoose.Schema({
    fileName: {
        type: 'string',
        required: 'You need to specifie a fileName'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Gallery', gallerySchema);
