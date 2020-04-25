// Déclaration des dépendances 
const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
cors = require('cors'),
path = require('path'),
port = 5000, 
app = express();  
require('dotenv').config();

var multer = require('multer'); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    }, // Si il ne trouve pas de fichier upload je retourne null sinon il enregistre bien dans l'upload
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    } // Si il trouve que le nom d'origine existe déjà, en cas doublons 
}) 



var upload = multer({storage: storage })



// traitement des données dans le corps du bdody des requêtes, traitement des données en json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
let corsOption = {origin: 'http://localhost:3000'}
app.use(cors(corsOption));
// app.use(bearerToken());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Permet de rendre le dossier upload public, path.join permet de récupérer da mnière dynamique le chemin d'accès au dossier upload. Afin de savoir où les img sont upload

// Initialisation de la connexion a la base de données
mongoose.connect('mongodb://localhost/UniArts', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// importation des controllers 
AuthController = require('./controlers/auth');
UserController = require('./controlers/user');
ProjectController = require('./controlers/project'); 
LinksController = require('./controlers/links');
ProfileUserController = require('./controlers/profileUser');


// Déclaration des routes :
app.post('/user/register', AuthController.register); //user/register : route pour permettre à l'artiste de s'identifier
app.post('/user/login', AuthController.login); //user/login: route pour permettre à l'artiste de procéder à la connexion à son profil
app.get('/user/getById', UserController.getById);

// back-office user(artistes): Gestion de projets
app.post('/user/addProject',ProjectController.newProject); // user/addProject: permet à l'utilisateur de créer leurs projets
app.put('/user/updateProject/:id', ProjectController.updateProject); // user/updateProject : permet à l'utilisateur de modifier leurs projets
app.get('/user/getAllProjects', ProjectController.getAllProject); // user/getAllProject:  permet d'afficher la liste des projets créé par le user
app.delete('/user/deleteProject/:id',ProjectController.deleteProject); // user/deleteProject: permet à l'utilisateur de supprimer ses projets

//back-office user(artistes): Gestion des liens
app.post('/user/addLink', LinksController.addLink); 
app.put('/user/updateLink/:id', LinksController.updateLink); 
app.get('/user/getAllLinks', LinksController.getAllLink); 
app.delete('/user/deleteLink/:id', LinksController.deleteLink);

// back-office user(artistes): Gestion de profil 
app.put('/user/updateAvatar', upload.single('avatar'), ProfileUserController.updateAvatar); 
app.put('/user/updateProfile', ProfileUserController.updateProfile);
app.get('/user/getAvatar/:id', ProfileUserController.getAvatar);


app.listen(port);