const Article = require('../models/article'),
User = require('../models/user'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY;

exports.newArticle = function(req, res){
    header = req.headers.authorization;
    const token = header.split(" ")[1];

    jwt.verify(token, jwt_secret, function(err,decoded){ // verification du token en utilisant bearer token dans les autorisation de la requête
        if(err){
            res.status(401).json('no token provided')
        }else {

            let article = new Article({
                title: req.body.title, 
                content: req.body.content,
                artistePseudo: req.body.artistePseudo,
                artisteName: req.body.artisteName,
                image: req.file.filename
            });
            article.save({_id: decoded.id}).then((newArticle)=>{
                if(decoded.role === "Admin"){  // verificaion rôle, récupération de l'id du projet créé
                    User.updateOne({_id: decoded.id},{$push: {articleId: newArticle}})
                    .then((data) =>{   
                        if(req.file === undefined){ 
                            console.log("multer req: ", req.file)
                            res.status(200).json(data)
                        }else{
                            console.log("multer req: ", req.file)
                            res.status(200).json(data)
                        }
                    })
                    .catch((err) =>{
                        console.log("multer req: ", req.file)
                        console.log(err)
                        res.status(400).json(err)
                    });
                };
            })
            .catch((err) =>{
                console.log("multer req: ", req.file)
                console.log("ARTICLE IMG: ", article.image)
                res.status(400).json(err)
            });
        };
    }); 
};


// let article = new Article({
//     title: req.body.title, 
//     content: req.body.content,
//     artistePseudo: req.body.artistePseudo,
//     artisteName: req.body.artisteName,
//     image: req.file.filename
// });