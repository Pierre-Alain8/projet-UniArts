const Project = require('../models/project'),
User = require('../models/user'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY;

exports.newProject = function(req, res){

    jwt.verify(req.token, jwt_secret, function(err,decoded){
    
        if(err){
            console.log(err)
            return false
        } else if(decoded.role){
           
            let project = new Project({
                titleProject: req.body.titleProject, 
                description: req.body.description, 
                content: req.body.content, 
                cover: req.body.cover,
                userId: [decoded.id]
            }); 
            
            project.save(function(err, data){ //Si l'user remplis les champs requis pour la création d'un projet,MAJ eégalement le profil de l'utilisateur 
                if(err){
                    console.log(project) 
                    console.log(err)
                    return res.status(400).json(err)
                    
                } else(data)
                    console.log(project)
                    User.updateOne({
                        id:[decoded.id], 
                        $set: {projectId: req.body['projectId[]']}},function(err, data){
                            if(err){
                                console.log(err)
                                res.status(204).json(err)
                            }else {
                                console.log("post du projet ajouté avec succès, update user :ok")
                                res.status(200).json(data)
                            }
                    });
            });
        };
    }); 


};