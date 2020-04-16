const User = require('../models/user');
jwt = require('jsonwebtoken');
jwt_secret = process.env.JWT_SECRET_KEY;


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
                    res.status(200).json(user);
                }

            });
        };

    });
};
