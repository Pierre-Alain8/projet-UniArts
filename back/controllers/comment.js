// exports.newComment = function(req, res){
//     header = req.headers.authorization;
//     const token = header.split(" ")[1];

//     let article = new Article({
//         title: req.body.title, 
//         content: req.body.content,
//         artistePseudo: req.body.artistePseudo,
//         artisteName: req.body.artisteName,
//         image: req.file.filename
//     });
//     article.save({_id: decoded.id}).then((newArticle)=>{
//         if(decoded.role === "Admin"){  // verificaion rôle, récupération de l'id du projet créé
//             User.updateOne({_id: decoded.id},{$push: {articleId: newArticle}})
//             .then((data) =>{   
//                 res.status(200).json(data)
//             })
//             .catch((err) =>{
//                 console.log(err)
//                 res.status(400).json(err)
//             });
//         };
//     })
//     .catch((err) =>{
//         res.status(400).json(err)
//     });
// };

// // exports.getAllArticles = function(req, res){
// //     header = req.headers.authorization;
// //     const token = header.split(" ")[1];

// //     jwt.verify(token, jwt_secret, function(err, decoded){
// //         if(err){
// //             res.status(401).json('no token provided')
// //         }else{
// //             User.findOne({_id: decoded.id}).populate('articleId').exec().then((article) =>{
// //                 console.log(article)
// //                 res.status(200).json(article);  
// //             })
// //             .catch((err)=>{
// //                 console.log(res)
// //                 res.status(400).json(err);
// //             });
// //         };
// //     });
// // };

// // exports.updateArticle = function(req, res){
// //     header = req.headers.authorization;
// //     const token = header.split(" ")[1];

// //     jwt.verify(token, jwt_secret, function(err,decoded){
// //         if(err){
// //             res.status(401).json('no token provided')
// //             return false
// //         } else if(decoded.id){
// //             let {title, content, artistePseudo, artisteName} = req.body; 
// //             let image = req.file.filename;

// //             Article.updateOne({_id: req.params.id}, 
// //                 {$set:{title: title, content: content, artistePseudo: artistePseudo, artisteName: artisteName, image: image} }, 
// //                 function(err, data){
// //                 if(err){
// //                     console.log('update du project fail')
// //                     console.log("error data:", data)
// //                     res.status(204).json(err)
// //                 }else {
// //                     console.log(data)
// //                     res.status(200).json(data)
// //                 };

// //             });
// //         };
// //     });
// // };

// // exports.deleteArticle = function(req, res){
// //     header = req.headers.authorization;
// //     const token = header.split(" ")[1];

// //     jwt.verify(token, jwt_secret, function(err,decoded){
// //         if(err){
// //             res.status(401).json('no token provided')
// //             return false
// //         } else if(decoded.role === "Admin"){
// //             Article.deleteOne({_id: req.params.id}, function(err, data){
// //                 if(err){
// //                     console.log(err)
// //                     res.status(400).json(err)
// //                 }
// //                 else{
// //                     console.log("le projet a été supprimé avec succès")
// //                     res.status(200).json(data)
// //                 }
// //             })
// //         }

// //     });
// // };

