// Déclaration des dépendances 
const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
cors = require('cors');

require('dotenv').config();

app = express(); 

// traitement des données dans le corps du bdody des requêtes, traitement des données en json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
let corsOption = {origin: 'http://localhost:3000'}
app.use(cors(corsOption));


// Initialisation de la connexion a la base de données
mongoose.connect('mongodb://localhost/UniArts', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// importation des controllers 
AuthController = require('./controlers/auth');


app.get('/', (request, response) => {
    response.send('Hello UniArts')
});



// Déclaration des routes :

//user/register : route pour permettre à l'artiste de s'identifier
app.route('/user/register').post(AuthController.register);
//user/login: route pour permettre à l'artiste de procéder à la connexion à son profil
app.route('/user/login').post(AuthController.login); 



app.listen(8080);