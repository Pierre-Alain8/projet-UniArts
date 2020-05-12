const Project = require('../models/project'),
User = require('../models/user'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY;

exports.newProject = function(req, res){
    header = req.headers.authorization;
    const token = header.split(" ")[1];

    jwt.verify(token, jwt_secret, function(err,decoded){ // verification du token en utilisant bearer token dans les autorisation de la requête
        if(err){
            res.status(401).json('no token provided')
        }else {
            let project = new Project({
                title: req.body.title, 
                description: req.body.description, 
                content: req.body.content,
                cover: req.file.filename
            });
            project.save({_id: decoded.id}).then((newProject)=>{
                    if(decoded.role){  // verificaion rôle, récupération de l'id du projet créé
                        User.updateOne({_id: decoded.id},{$push: {projectId: newProject}})
                        .then((data) =>{
                            console.log(data)
                            res.status(200).json(data)
                        })
                        .catch((err) =>{
                            console.log(err)
                            res.status(400).json(err)
                        });
                    };
                    console.log("project.cover", project.cover)
            })
            .catch((err) =>{
                res.status(400).json(err)
            });
        };
    }); 
};

exports.getAllProject = function(req, res){
    header = req.headers.authorization;
    const token = header.split(" ")[1];

    jwt.verify(token, jwt_secret, function(err, decoded){
        if(err){
            res.status(401).json('no token provided')
        }else{
            User.findOne({_id: decoded.id}).populate('projectId').exec().then((project) =>{
                console.log(project)
                res.status(200).json(project);  
            })
            .catch((err)=>{
                console.log(res)
                res.status(400).json(err);
            });
        };
    });
};


exports.updateProject = function(req, res){
    header = req.headers.authorization;
    const token = header.split(" ")[1];

    jwt.verify(token, jwt_secret, function(err,decoded){
        if(err){
            res.status(401).json('no token provided')
            return false
        } else if(decoded.id){
            let {title, description, content} = req.body; 
            let cover = req.file.filename;

            Project.updateOne({_id: req.params.id}, 
                {$set:{title: title, description: description, content: content, cover: cover} }, 
                function(err, data){
                if(err){
                    console.log('update du project fail')
                    console.log("error data:", data)
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
    header = req.headers.authorization;
    const token = header.split(" ")[1];

    jwt.verify(token, jwt_secret, function(err,decoded){
        if(err){
            res.status(401).json('no token provided')
            return false
        } else if(decoded.role){
            Project.deleteOne({_id: req.params.id}, function(err, data){
                if(err){
                    console.log(err)
                    res.status(400).json(err)
                }
                else{
                    console.log("le projet a été supprimé avec succès")
                    res.status(200).json(data)
                }
            })
        }

    });
};






