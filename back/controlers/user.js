const User = require('../models/user');
jwt = require('jsonwebtoken');
jwt_secret = process.env.JWT_SECRET_KEY;


exports.addProfile = function(req, res){
    const about = req.body.about; 
    const avatar = req.file.path;
    jwt.verify(req.token, jwt_secret, function(err,decoded){
        if(err){
            res.status(400).json(err)
        } else {
            console.log(req.file)
            console.log(decoded.id)
            User.findOneAndUpdate({_id: decoded.id}, {$set: {avatar:avatar, about: about}}, function(err, data){
                if(err){
                    res.status(403).json(err) 
                    console.log(avatar)
                }
                else{
                    console.log(avatar)
                    res.status(200).json(data)
                };
            });
        };
    });
};

exports.getById = function(req, res){
    // verification du token en utilisant bearer token dans les autorisation de la requête
    jwt.verify(req.token, jwt_secret, function(err, decoded){

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

            })
        }

    })
}
