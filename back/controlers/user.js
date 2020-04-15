const User = require('../models/user');
jwt = require('jsonwebtoken');
jwt_secret = process.env.JWT_SECRET_KEY;


exports.updateAvatar = function(req, res){
    avatar = req.file.filename,
    header = req.headers.authorization;
    const token = header.split(" ")[1];

    console.log(token)

    jwt.verify(token, jwt_secret, function(err,decoded){
        if(err){
            res.status(400).json(err)
            console.log(err)
        } else {
            User.findOneAndUpdate({_id: decoded.id}, {$set: {avatar:avatar}}, function(err, data){
                if(err){
                    res.status(403).json(err) 
                    console.log(err)
                }
                else{
                    console.log(data)
                    res.status(200).json(req.file.filename)
                };
            });
        };
    });
};

exports.updateAbout = function(req, res){
    let about = req.body.about; 
    const header = req.headers.authorization,
    token = header.split(" ")[1];

    jwt.verify(token, jwt_secret, function(err, decoded){
        if(err){
            res.status(400).json(err)
            console.log(err)
        }else{
            User.findOneAndUpdate({_id: decoded.id}, {$set: {about: about}}, function(err, data){
                if(err){
                    res.status(403).json(err) 
                    console.log(err)
                }else{
                    console.log(data)
                    res.status(200).json(data) 
                };
            });
        };
    });

};

exports.getById = function(req, res){
    // verification du token en utilisant bearer token dans les autorisation de la requête
    header = req.headers.authorization;
    const token = header.split(" ")[1];

    jwt.verify(token, jwt_secret, function(err, decoded){

        if(err) {
            res.status(204).json(err)
        } else {
            res.status(200).json(user);

            // decoded : base du token où on récupère l'id du l'utilisateur qui a été inséré
            User.findOne({_id: decoded.id}, function(err, user) {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(200).json("avatar upload successfuly");
                }

            });
        };

    });
};
