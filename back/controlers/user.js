const User = require('../models/user');

exports.getById = function(req, res){
    User.find({_id: id}, function(err, user) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(user);
        }
        
    })
}