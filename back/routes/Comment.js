const express = require('express'); 
const comment = express.Router()


// importation du controller
CommentController = require('../controllers/comment'); 
// Intitulé des routes :

// const uploadsArticle = upload.fields([{name:"image", maxCount: 8}])
// upload.array('image', 12)

// back-office user(artistes): Gestion de projets
comment.post('/addComment', CommentCtroller.newComment);


module.exports	= comment;