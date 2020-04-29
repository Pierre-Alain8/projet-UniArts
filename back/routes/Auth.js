const express = require('express'); 
const auth = express.Router();
const cors = require('cors');
auth.use(cors())

// importation du controller
AuthController = require('../controllers/auth');

// Intitulé des routes :

// authentification user: 
auth.post('/register', AuthController.register); //user/register : route pour permettre à l'artiste de s'identifier
auth.post('/login', AuthController.login); //user/login: route pour permettre à l'artiste de procéder à la connexion à son profil

// // authentification admin
auth.post('/adm/register', AuthController.admRegister);

module.exports = auth;