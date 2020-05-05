const Validator = require("validator");
// Permet de vérifier si le champs est vide ou non
const isEmpty = require("./isEmpty");


module.exports = function validateRegister(data) {
    // Si les champs suivant sont vides, retourne un champ vide
    data.firstName = !isEmpty(data.firstName) ? data.firstName: "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName: "";
    data.pseudo = !isEmpty(data.pseudo) ? data.pseudo: "";
    data.email = !isEmpty(data.email) ? data.email: "";
    data.password = !isEmpty(data.password) ? data.password: "";
    data.password2 = !isEmpty(data.password2) ? data.password2: "";

    let error = {}


    if(Validator.isEmpty(data.lastName)){
        error.lastName = "Veuillez spécifier un nom"
    }

    if(Validator.isEmpty(data.firstName)){
        error.firstName = "Veuillez spécifier un prénom"
    }

    if(!Validator.isEmail(data.email)){
        error.email = "Votre email n'est pas correct"
    }

    if(Validator.isEmpty(data.email)){
        error.email = "Veuillez spécifier un email"
    }

    if(Validator.isEmpty(data.password)){
        error.password = "Veuillez spécifier un password"
    }

    if(Validator.isEmpty(data.password2)){
        error.password2 = "Veuillez confimer votre password"
    }

    if(!Validator.equals(data.password, data.password2)){
        error.password2 = "Votre password ne correspond pas au précédent"
    }

    return {
        error,
        isValid: isEmpty(error)
    };

   
}