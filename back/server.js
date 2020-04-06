// Déclaration des dépendances 
const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
cors = require('cors');
bearerToken = require('express-bearer-token');

require('dotenv').config();

app = express(); 

// traitement des données dans le corps du bdody des requêtes, traitement des données en json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
let corsOption = {origin: 'http://localhost:3000'}
app.use(cors(corsOption));
app.use(bearerToken());


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
app.route('/user/myOffice').get(UserController.getById); // user/myOffice : retourne les infos du user pour son profil (office)

// back-office user(artistes): Gestion de projets
app.route('/user/addProject').post(ProjectController.newProject); // user/addProject: permet à l'utilisateur de créer leurs projets
app.route('/user/updateProject/:id').put(ProjectController.updateProject); // user/updateProject : permet à l'utilisateur de modifier leurs projets
app.route('/user/getAllProjects/:id').get(ProjectController.getAllProject); // user/getAllProject:  permet d'afficher la liste des projets créé par le user
app.route('/user/deleteProject/:id').delete(ProjectController.deleteProject); // user/deleteProject: permet à l'utilisateur de supprimer ses projets

// Gestion de links
app.route('/user/addLink').post(LinksController.newLink); 
app.route('/user/updateLink/:id').put(LinksController.updateLink); 
app.route('/user/getAllLinks/:id').get(LinksController.getAllLink); 
app.route('/user/deleteLink/:id').delete(LinksController.deleteLink);





app.listen(5000);