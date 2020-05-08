// Déclaration des dépendances 
const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
validator = require('validator'),
cors = require('cors'),
path = require('path'),
port = 5000, 
app = express();  
require('dotenv').config();


// traitement des données dans le corps du body des requêtes, traitement des données en json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
let corsOption = {origin: 'http://localhost:3000'}
app.use(cors(corsOption));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Permet de rendre le dossier upload public, path.join permet de récupérer da manière dynamique le chemin d'accès au dossier upload. Afin de savoir où les img sont upload

// Initialisation de la connexion a la base de données
mongoose.connect('mongodb://localhost/UniArts', {
    useNewUrlParser: true, useUnifiedTopology: true, 
    useCreateIndex: true
}).then(() => console.log('MongoDB Connected')) .catch(err => console.log(err));


// Déclaration des routes :
var auth = require('./routes/Auth');
var user = require('./routes/User');

// back-office user(artistes):
var project = require('./routes/Project');
var link = require('./routes/Link');
var profile = require('./routes/Profile');

app.use('/user', auth);
app.use('/user', user);
app.use('/user', project);
app.use('/user', link);
app.use('/user', profile);


app.listen(port);