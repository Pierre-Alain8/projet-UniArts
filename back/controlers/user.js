const User = require('../models/user');
jwt = require('jsonwebtoken');
jwt_secret = process.env.JWT_SECRET_KEY;


exports.addProfile = function(req, res){
    const pseudo = req.body.pseudo; 
    const avatar = req.file.path;
    jwt.verify(req.token, jwt_secret, function(err,decoded){
        if(err){
            res.status(400).json(err)
        } else {
            console.log(req.file)
            console.log(decoded.id)
            User.findOneAndUpdate({_id: decoded.id}, {$set: {avatar:avatar, pseudo:pseudo}}, function(err, data){
                if(err){
                    res.status(403).json(err) 
                    console.log(avatar)
                }
                else{
                    console.log(avatar)
                    res.status(200).json(data)
                };
            });
            // if(!req.file){
            //     res.status(403).json('no file provided');        
            //     console.log(req)        
            // }
            // else{
                // User.create({avatar: req.file}, function(err, newAvatar){
                //     if(err)
                //         res.status(400).json(err);
                //     else
                //         res.status(201).json("new Avatar uppload successfily & about create sucessfuly");
                // });
            // };
        };
    });
};