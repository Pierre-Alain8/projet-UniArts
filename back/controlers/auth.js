//Récupération des models :
const User = require('../models/user'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY;



exports.register = function (req, res) {
     // hachage du password du user
    
    const regex = new RegExp("/^(?=.\d)(?=.[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/");

    if(regex.test(req.body.password)){
        let message = "votre password doit contenir au moins 1 lettre minuscule, 1 lettre majuscule, 1 caractères spéciacle, 1 caractère numérique et de plus de 8 caractères"  
        return res.status(401).json(message)
    }
    
    let hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;


    let user = new User({ 
            name : req.body.name, 
            pseudo: req.body.pseudo, 
            email: req.body.email, 
            // about: req.body.about,
            password: hash
            
        });


        if(!user) {
            let message = "Inscription impossible "
            
            res.status(400).json(message)
            console.log(user.password)

        } else {

            user.save(function(err,data){
                    
                if(err){
                    res.status(400).json(err)
                    console.log('Inscription non effectué : veuillez remplir tous les champs ')  
                    console.log(user)
                    console.log(data)
                    
                } else {
                    res.status(200).json(data)
                    console.log(data)
                    console.log('Inscription effectué avec succès')
                };
            });
        };
        

  

};

exports.login = function (req, res) {
    User.findOne({email : req.body.email}, function(err, user){
        console.log(req.body.email);

        if(err)
            res.status(400).json({adhesion: false, message: err}); 
        else if(!user)
            res.status(201).json({adhesion: false, message: "user not found"})
        else{

            bcrypt.compare(req.body.password, user.password, function(err, result) {
                
                if(result) {
                    let token = jwt.sign({id: user._id, admin: user.role}, jwt_secret)
                    let response = {user: user, adhesion: true, token: token}
                    res.status(200).json(response)
                    console.log('vous êtes bien connecté')
                    console.log(result)
                    console.log(token)
                } else {
                    res.status(400).json(err)
                    console.log('Veuillez entrez un email et un password existant')

                };
            });
        
        }
    });
};