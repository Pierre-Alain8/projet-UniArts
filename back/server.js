// Déclaration des dépendances 
const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
cors = require('cors'),
path = require('path'),
port = process.env.PORT, 
app = express();  
require('dotenv').config();


// traitement des données dans le corps du bdody des requêtes, traitement des données en json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
let corsOption = {origin: 'http://localhost:3000'}
app.use(cors(corsOption));
// app.use(bearerToken());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Permet de rendre le dossier upload public, path.join permet de récupérer da mnière dynamique le chemin d'accès au dossier upload. Afin de savoir où les img sont upload

// Initialisation de la connexion a la base de données
mongoose.connect('mongodb://localhost/UniArts', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});


// Déclaration des routes :
var Auth = require('./routes/Auth');
var Users = require('./routes/Users');

// back-office user(artistes):
var Project = require('./routes/Project');
var Link = require('./routes/Link');
var Profile = require('./routes/Profile');

app.use('/auth', Auth);
app.use('/users', Users);
app.use('/project', Project);
app.use('/link', Link);
app.use('/profile', Profile);






app.listen(port);