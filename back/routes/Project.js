const express = require('express'); 
const project = express.Router()
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
ProjectController = require('../controllers/project'); 

// Intitulé des routes :

// back-office user(artistes): Gestion de projets
project.post('/addProject',upload.single('cover') ,ProjectController.newProject); // user/addProject: permet à l'utilisateur de créer leurs projets
project.put('/updateProject/:id',upload.single('cover') ,ProjectController.updateProject); // user/updateProject : permet à l'utilisateur de modifier leurs projets
project.get('/getAllProjects', ProjectController.getAllProjects); // user/getAllProject:  permet d'afficher la liste des projets créé par le user
project.delete('/deleteProject/:id', ProjectController.deleteProject); // user/deleteProject: permet à l'utilisateur de supprimer ses projets

module.exports	= project;