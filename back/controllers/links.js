const Link = require('../models/link'),
User = require('../models/user'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY;

exports.addLink = function(req, res){
    console.log(" Test entrée addLink ")
    header = req.headers.authorization;
    const token = header.split(" ")[1];

    jwt.verify(token, jwt_secret, function(err,decoded){
        if(err){
            res.status(401).json('no token provided')
        }else {
            let link = new Link({
                linkTitle: req.body.linkTitle, 
                linkContent: req.body.linkContent,
            });
            link.save({_id: decoded.id}, function(err, newLink){
                console.log(" entrée newLink: " + newLink)
                if(err){
                    console.log(err)
                    res.status(400).json(err);
                } else if(decoded.role){
                    console.log("link save:" + newLink)
    
                    User.updateOne({_id: decoded.id},{$push: {linkId: newLink}},function(err, data){
                        // console.log("update: " + linkId)
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
    header = req.headers.authorization;
    const token = header.split(" ")[1];

    jwt.verify(token, jwt_secret, function(err, decoded){
        if(!decoded.role){
            res.status(401).json('no token provided')
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
    header = req.headers.authorization;
    const token = header.split(" ")[1];

    jwt.verify(token, jwt_secret, function(err,decoded){
        if(!decoded.role){
            res.status(401).json('no token provided')
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
    header = req.headers.authorization;
    const token = header.split(" ")[1];

    jwt.verify(token, jwt_secret, function(err,decoded){
        if(!decoded.role){
            res.status(401).json('no token provided')
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

