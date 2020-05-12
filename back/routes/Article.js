const express = require('express'); 
const article = express.Router()
var multer = require('multer'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    }, // Si il ne trouve pas de fichier upload je retourne null sinon il enregistre bien dans l'upload
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    } // Si il trouve que le nom d'origine existe déjà, en cas doublons 
}) 

var upload = multer({
    storage: storage,
    limits: { 
        fileSize: 1024 * 1024 * 8 
    }
    // fileFilter: fileFilter
  });

var upload = multer({storage: storage })

// importation du controller
ArticleController = require('../controllers/article'); 
// Intitulé des routes :

// back-office user(artistes): Gestion de projets
article.post('/addArticle',upload.single('image') ,ArticleController.newArticle);
// article.put('/updateArticle/:id',upload.single('cover') ,);
// article.get('/getAllArticles', ); 
// article.delete('/deleteArticle/:id', ); 

module.exports	= article;