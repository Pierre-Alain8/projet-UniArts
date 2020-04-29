const express = require('express'); 
const link = express.Router()

// importation du controller
LinksController = require('../controllers/links');

// Intitulé des routes :

//back-office user(artistes): Gestion des liens
link.post('/addLink', LinksController.addLink); 
link.put('/updateLink/:id', LinksController.updateLink); 
link.get('/getAllLinks', LinksController.getAllLink); 
link.delete('/deleteLink/:id', LinksController.deleteLink);

module.exports	= link;