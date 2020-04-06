const Project = require('../models/project'),
User = require('../models/user'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY;

exports.newProject = function(req, res){
    jwt.verify(req.token, jwt_secret, function(err,decoded){

        if(err){
            console.log(err)
        }else {
            let project = new Project({
                titleProject: req.body.titleProject, 
                description: req.body.titleProject, 
                content: req.body.titleProject,
                cover: req.body.titleProject, 
            })
            // En paramètre de la fonction save je récupère l'id du user. Dans les paramètres de la fonction callback de save, newData est une variable qui récupèerera les données du nouveau projet
            project.save({_id: decoded.id}, function(err, newProject){
                if(err){
                    res.status(400).json(err);
                } else if(decoded.role){
                    console.log("project save:", newProject)
                    // Avant de pouvoir update le user, je m'assure que celui-ci a bien le rôle "Artiste", ainsi le user pourra être update afin de lier son projet à son profil en récupérant l'id du projet nouvellement créé
                    User.updateOne({_id: decoded.id},{$push: {projectId: newProject}},function(err, data){
                        console.log(newProject)
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

exports.getAllProject = function(req, res){
    jwt.verify(req.token, jwt_secret, function(err, decoded){
        if(err){
            res.status(204).json(err)
        }else{
            User.findOne({_id: decoded.id}).populate('projectId').exec( function(err, project){
                if(err){
                    console.log(res)
                    res.status(400).json(err);
                }else {
                    console.log(project)
                    res.status(200).json(project);
                }
            });
        }
    });

};


exports.updateProject = function(req, res){
    jwt.verify(req.token, jwt_secret, function(err,decoded){
        if(err){
            console.log(err)
            return false
        } else if(decoded.id){
            let {titleProject, description, content, cover} = req.body; 

            Project.updateOne({_id: req.params.id}, 
                {$set:{titleProject: titleProject, description: description, content: content, cover: cover} }, 
                function(err, data){
                if(err){
                    console.log('update du project fail')
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

exports.deleteProject = function(req, res){
    jwt.verify(req.token, jwt_secret, function(err,decoded){
        if(err){
            console.log(err)
            return false
        } else if(decoded.role){
            Project.deleteOne({_id: req.params.id}, function(err, data){
                if(err)
                    res.status(400).json(err)
                else
                    console.log("le projet a été supprimé avec succès")
                    res.status(200).json(data)
            })
        }

    });
};






