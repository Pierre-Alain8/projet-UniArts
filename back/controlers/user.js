const User = require('../models/user');
jwt = require('jsonwebtoken');
jwt_secret = process.env.JWT_SECRET_KEY;


exports.addProfile = function(req, res){
    jwt.verify(req.token, jwt_secret, function(err,decoded){
        let user = new User({
            avatar: req.file.avatar, 
            about: req.body.about
        })
        if(!decoded.role){
            res.status(401).json('no token provided')
        } else {
            if(!req.file)
                res.status(401).json('no file provided'); 
            else{
                User.create({avatar: req.file.avatar, about: req.body.about, _id: decoded.id}, function(err, newAvatar){
                    if(err)
                        res.status(400).json(err);
                    else
                        res.status(201).json("new Avatar uppload successfily & about create sucessfuly");
                });
            };
        };
    });
};