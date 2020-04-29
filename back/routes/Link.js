const express = require('express'); 
const link = express.Router()

// importation du controller
LinksController = require('../controllers/links');

// Déclaration des routes :

//back-office user(artistes): Gestion des liens
link.post('/user/addLink', LinksController.addLink); 
link.put('/user/updateLink/:id', LinksController.updateLink); 
link.get('/user/getAllLinks', LinksController.getAllLink); 
link.delete('/user/deleteLink/:id', LinksController.deleteLink);

module.exports	= link;