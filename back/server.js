// Déclaration des dépendances 
const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
cors = require('cors');
bearerToken = require('express-bearer-token'), 
path = require('path'),
port = 5000, 
app = express();  
require('dotenv').config();

var multer = require('multer'); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    }, // Si je ne trouve pas de fichier upload je retourne null sinon il enregistre bien dans l'upload
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    } // Si il trouve que le nom d'origine existe déjà, en cas doublons 
}) 



var upload = multer({storage: storage })
console.log(upload)



// traitement des données dans le corps du bdody des requêtes, traitement des données en json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
let corsOption = {origin: 'http://localhost:3000'}
app.use(cors(corsOption));
app.use(bearerToken());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // fichier upload accessible pour tout les uses

// Initialisation de la connexion a la base de données
mongoose.connect('mongodb://localhost/UniArts', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// importation des controllers 
AuthController = require('./controlers/auth');
UserController = require('./controlers/user');
ProjectController = require('./controlers/project'); 
LinksController = require('./controlers/links');


// Déclaration des routes :
app.route('/user/register').post(AuthController.register); //user/register : route pour permettre à l'artiste de s'identifier
app.route('/user/login').post(AuthController.login); //user/login: route pour permettre à l'artiste de procéder à la connexion à son profil

// back-office user(artistes): Gestion de projets
app.route('/user/addProject').post(ProjectController.newProject); // user/addProject: permet à l'utilisateur de créer leurs projets
app.route('/user/updateProject/:id').put(ProjectController.updateProject); // user/updateProject : permet à l'utilisateur de modifier leurs projets
app.route('/user/getAllProjects/:id').get(ProjectController.getAllProject); // user/getAllProject:  permet d'afficher la liste des projets créé par le user
app.route('/user/deleteProject/:id').delete(ProjectController.deleteProject); // user/deleteProject: permet à l'utilisateur de supprimer ses projets

//back-office user(artistes): Gestion des liens
app.route('/user/addLink').post(LinksController.newLink); 
app.route('/user/updateLink/:id').put(LinksController.updateLink); 
app.route('/user/getAllLinks/:id').get(LinksController.getAllLink); 
app.route('/user/deleteLink/:id').delete(LinksController.deleteLink);

// back-office user(artistes): Gestion de profil 
app.put('/user/addProfile', upload.single('avatar'), UserController.addProfile);  

// add file image 
// add text





app.listen(port);