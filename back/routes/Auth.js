const express = require('express'); 
const auth = express.Router()

// importation du controller
AuthController = require('../controllers/auth');

// Déclaration des routes :

// authentification user: 
auth.post('/user/register', AuthController.register); //user/register : route pour permettre à l'artiste de s'identifier
auth.post('/user/login', AuthController.login); //user/login: route pour permettre à l'artiste de procéder à la connexion à son profil

// // authentification admin
// auth.post('/adm/auth/register', AuthController.admRegister);
// auth.post('/adm/auth/login', AuthController.admLogin);

module.exports	= auth;