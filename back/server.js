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


// Déclaration des routes :

//user/register : route pour permettre à l'artiste de s'identifier
app.route('/user/register').post(AuthController.register);
//user/login: route pour permettre à l'artiste de procéder à la connexion à son profil
app.route('/user/login').post(AuthController.login); 

// user/myProfile: route accessible par tout type d'user, permettant d'afficher le profile  de l'artiste selon son id
app.route('user/myProfile').get(UserController.getById);



app.listen(8080);