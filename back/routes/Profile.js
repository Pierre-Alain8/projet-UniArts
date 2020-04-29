const express = require('express'); 
const profile = express.Router()
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
ProfileUserController = require('../controllers/profileUser');


// Intitulé des routes :

// back-office user(artistes): Gestion de profil 
profile.put('/updateAvatar', upload.single('avatar'), ProfileUserController.updateAvatar); 
profile.put('/updateProfile', ProfileUserController.updateProfile);
profile.get('/getAvatar/:id', ProfileUserController.getAvatar);

module.exports	= profile;