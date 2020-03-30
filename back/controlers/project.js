const Project = require('../models/project'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY;

exports.newProject = function(req, res){

    jwt.verify(req.token, jwt_secret, function(err,decoded){
    
        if(err){
            console.log(err)
            return false
        } else if(decoded.role === "Artiste"){
           
            let project = new Project({
                titleProject: req.body.titleProject, 
                description: req.body.description, 
                content: req.body.content, 
                cover: req.body.cover,
                userId: [decoded.id]
            }); 
            
            project.save(function(err, data){
                if(err){
                    // let message = "ah revois ta requête"
                    console.log(project) 
                    console.log(err)
                    return res.status(204).json(err)
                } else(data)
                    console.log(data)
                    return res.status(200).json(data)  
            });
        };
    }); 

   
};