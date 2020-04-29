const express = require('express'); 
const users = express.Router()
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
UserController = require('../controllers/user');

// Déclaration des routes:

// Gallery images (artistes)
users.get('/user/getById', UserController.getById);
users.post('/gallery/upload', upload.single('media'), UserController.addMediaGallery);
users.get('/user/getById', UserController.getById);
users.delete('/gallery/deleteMedia/:id', UserController.deleteMediaGallery);

module.exports	= users;