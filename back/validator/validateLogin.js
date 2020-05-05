const Validator = require("validator");
// Permet de vérifier si le champs est vide ou non
const isEmpty = require("./isEmpty");


module.exports = function validateLogin(data) {
    // Si les champs suivant sont vides, retourne un champ vide
    data.email = !isEmpty(data.email) ? data.email: "";
    data.password = !isEmpty(data.password) ? data.password: "";
    
    let error = {}

    if(!Validator.isEmail(data.email)){
        error.email = "Votre email n'est pas correct"
    }

    if(Validator.isEmpty(data.email)){
        error.email = "Veuillez spécifier un email"
    }

    if(Validator.isEmpty(data.password)){
        error.password = "Veuillez spécifier un password"
    }

    return {
        error,
        isValid: isEmpty(error)
    };
}

// User.findOne({email : req.body.email}, function(err, user){
    //     console.log(req.body.email);

    //     if(err)
    //         res.status(400).json({adhesion: false, message: err}); 
    //     else if(!user)
    //         res.status(201).json({adhesion: false, message: "user not found"})
    //     else{

    //         bcrypt.compare(req.body.password, user.password, function(err, result) {
                

    //             if(result) {
    //                 let token = jwt.sign({id: user._id, role: user.role}, jwt_secret, {
    //                     expiresIn : "24h"
    //                 })
    //                 let response = {user: user, adhesion: true, token: token}
    //                 res.status(200).json(response)
    //                 console.log('vous êtes bien connecté')
    //                 console.log(user)
    //             } else {
    //                 res.status(400).json(err)
    //                 console.log('Veuillez entrez un email et un password existant')

    //             };
               
    //         });  
    //     }
    // });
