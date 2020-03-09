// Déclaration des dépendances 
const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
cors = require('cors'), 
app = express(); 

// traitement des données dans le corps du bdody des requêtes, traitement des données en json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
app.use(cors());


// Initialisation de la connexion a la base de données
mongoose.connect('mongodb://localhost/todoList', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.get('/', (request, response) => {
    response.send('Hello UniArts')
});


//Récupération des models 
let User = require('./models/user');  

// Déclaration des routes 
app.route('/user/register').post(function(req, res) { 

    let user = new User({ 
        name : req.body.name, 
        pseudo: req.body.pseudo, 
        email: req.body.email, 
        password: req.body.password
    })

    
    if(user.name !== null && user.pseudo !== null && user.email !== null && user.password) {

        user.save(function(err,data){

            if(err){
                res.status(204).send(err)
                console.log('aah...il manque des infos')

            } else {
                res.status(200).send(data)
                console.log('vous vous êtes bien enregistré')
            }
        })
        
    }

});  


app.route('/user/login').post(function(req,res){

    // let user = new User({ 
    //     pseudo: req.body.pseudo, 
    //     email: req.body.email, 
    //     password: req.body.password
    // })

    User.findOne({email : req.body.email, pseudo : req.body.pseudo, password : req.body.password}, function(err, data){
        
        if(err){
            res.status(204).send(err)
            console.log('aah...il manque des infos')

        } else {
            res.status(200).send(data)
            console.log('vous êtes bien connecté')
        }
    

    })

    

       

    
})



app.listen(8080);

