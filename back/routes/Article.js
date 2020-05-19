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

  var upload = multer({ storage : storage }).array('image',2);

// importation du controller
ArticleController = require('../controllers/article'); 
// Intitulé des routes :

// const uploadsArticle = upload.fields([{name:"image", maxCount: 8}])
// upload.array('image', 12)

// back-office user(artistes): Gestion de projets
article.post('/addArticle',upload,ArticleController.newArticle);
article.put('/updateArticle/:id',upload, ArticleController.updateArticle);
article.get('/getAllArticles', ArticleController.getAllArticles); 
article.delete('/deleteArticle/:id',ArticleController.deleteArticle ); 

module.exports	= article;