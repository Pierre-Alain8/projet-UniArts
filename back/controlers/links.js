const Link = require('../models/link'),
User = require('../models/user'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY;

exports.newLink = function(req, res){
    jwt.verify(req.token, jwt_secret, function(err,decoded){

        if(err){
            console.log(err)
        }else {
            let link = new Link({
                linkTitle: req.body.linkTitle, 
                linkContent: req.body.linkContent,
            });
            // En paramètre de la fonction save je récupère l'id du user. Dans les paramètres de la fonction callback de save, newData est une variable qui récupèerera les données du nouveau projet
            link.save({_id: decoded.id}, function(err, newLink){
                if(err){
                    res.status(400).json(err);
                } else if(decoded.role){
                    console.log("link save:", newLink)
                    // Avant de pouvoir update le user, je m'assure que celui-ci a bien le rôle "Artiste", ainsi le user pourra être update afin de lier son projet à son profil en récupérant l'id du projet nouvellement créé
                    User.updateOne({_id: decoded.id},{$push: {linkId: newLink}},function(err, data){
                        console.log(newLink)
                        if (err) {
                            console.log(err)
                            res.status(400).json(err)
                        } else {
                            console.log(data)
                            res.status(200).json(data)
                        };
                    });
                };
            });
        };

    }); 


};


exports.getAllLink = function(req, res){
    jwt.verify(req.token, jwt_secret, function(err, decoded){
        if(err){
            res.status(204).json(err)
        }else{
            User.findOne({_id: decoded.id}).populate('linkId').exec( function(err, link){
                if(err){
                    console.log(res)
                    res.status(400).json(err);
                }else {
                    console.log(link)
                    res.status(200).json(link);
                }
            });
        }
    });
    
};

exports.updateLink = function(req, res){
    jwt.verify(req.token, jwt_secret, function(err,decoded){
        if(err){
            console.log(err)
            return false
        } else if(decoded.id){
            let {linkTitle, linkContent} = req.body; 

            Link.updateOne({_id: req.params.id}, 
                {$set:{linkTitle: linkTitle, linkContent: linkContent} }, 
                function(err, data){
                if(err){
                    console.log('update du lien fail')
                    console.log(err)
                    res.status(204).json(err)
                }else {
                    console.log(data)
                    res.status(200).json(data)
                };

            });
        };
    });
    
};


exports.deleteLink = function(req, res){
    jwt.verify(req.token, jwt_secret, function(err,decoded){
        if(err){
            console.log(err)
            return false
        } else if(decoded.role){
            Link.deleteOne({_id: req.params.id}, function(err, data){
                if(err)
                    res.status(400).json(err)
                else
                    console.log("le lien a été supprimé avec succès")
                    res.status(200).json(data)
            })
        }

    });
    
};

