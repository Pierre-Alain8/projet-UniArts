//Récupération des models :
const User = require('../models/user'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY;



exports.register = function (req, res) {
     // hachage du password du user
    let hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;


    let user = new User({ 
            name : req.body.name, 
            pseudo: req.body.pseudo, 
            email: req.body.email, 
            // about: req.body.about,
            password: hash
            
        });


        if(!user.name || !user.pseudo || !user.email || !user.password  ) {
            const  message = "Inscription impossible "
            res.status(400).send(message)

        } else {

            user.save(function(err,data){
                    
                if(err){
                    res.status(204).send(err)
                    console.log('Inscription non effectué : veuillez remplir tous les champs ')  
                    console.log(user)
                    console.log(data)
                    
                } else {
                    res.status(200).send(data)
                    console.log('Inscription effectué avec succès')
                };
            });
        };
        

  

};

exports.login = function (req, res) {
    User.findOne({email : req.body.email}, function(err, data){
        console.log(req.body.email);


        if(err)
            res.status(400).send({adhesion: false, message: err}); 
        else if(!data)
            res.status(201).send({adhesion: false, message: "user not found"})
        else{

         

            bcrypt.compare(req.body.password, data.password, function(err, result) {
                
                if(result) {
                    let token = jwt.sign({id: User._id}, jwt_secret)
                    let response = {user: data, adhesion: true, token: token}
                    res.status(200).send(response)
                    console.log('vous êtes bien connecté')
                } else {
                    res.status(400).send(err)
                    console.log('Veuillez entrez un email et un password existant')

                };
            });
        
        }
    });
};