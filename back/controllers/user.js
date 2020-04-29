const User = require('../models/user');
const Gallery = require('../models/gallery');
jwt = require('jsonwebtoken');
jwt_secret = process.env.JWT_SECRET_KEY;


exports.getById = function(req, res){
    // verification du token en utilisant bearer token dans les autorisation de la requête
    header = req.headers.authorization;
    const token = header.split(" ")[1];

    jwt.verify(token, jwt_secret, function(err, decoded){
        console.log(decoded.role)

        if(err) {
            res.status(204).json(err)
        } else {
            // decoded : base du token où on récupère l'id du l'utilisateur qui a été inséré
            User.findOne({_id: decoded.id}, function(err, user) {
                if (err) {
                    res.status(400).json(err);
                } else {
                    console.log(user)
                    console.log("Artiste role: ", decoded.role)
                    res.status(200).json(user);
                }

            });
        };

    });
};

exports.addMediaGallery  = function(req, res){
    header = req.headers.authorization;
    const token = header.split(" ")[1];
    console.log(token)

    jwt.verify(token, jwt_secret, function(err,decoded){
        if(err){
            res.status(400).json(err)
            console.log(err)
        } else {
            if(!req.file)
                res.status(403).json("no file provided");
            else{
                console.log(req.file);
                Gallery.create({fileName: req.file.filename, userId: decoded.id}, function (err, newImage){
                    if(err){
                        res.status(403).json(err) 
                        console.log("data: ", newImage)
                    }
                    else{
                        console.log(newImage)
                        res.status(200).json({message: "image upload successfully"})
                    };
                });
            }
           
        };
    });
};

exports.getGallery = function (req, res){
    header = req.headers.authorization;
    const token = header.split(" ")[1];
    console.log(token)

    jwt.verify(token, jwt_secret, function(err,decoded){
        if(err){
            res.status(400).json(err)
            console.log(err)
        } else {
            Gallery.find({}, function(err, gallery){
                if(err)
                    res.status(400).json(err)
                else
                    res.status(200).json(gallery)
            });
        };
    });
}

exports.deleteMediaGallery = function(req, res){
    header = req.headers.authorization;
    const token = header.split(" ")[1];

    jwt.verify(token, jwt_secret, function(err,decoded){
        if(err){
            res.status(401).json('no token provided')
            return false
        } else if(decoded.role){
            Gallery.deleteOne({_id: req.params.id}, function(err, data){
                if(err){
                    console.log(err)
                    res.status(400).json(err)
                }
                else{
                    console.log("l'image a été supprimé avec succès")
                    res.status(200).json(data)
                }
            })
        }

    });
}