//Récupération des models :
const User = require("../models/user"),
  bcrypt = require("bcrypt"),
  validateRegister = require("../validator/validateRegister"),
  validateLogin = require("../validator/validateLogin"),
  jwt = require("jsonwebtoken"),
  jwt_secret = process.env.JWT_SECRET_KEY,
  adm_login = process.env.ADMIN_LOGIN,
  adm_password = process.env.ADMIN_PASSWORD;

exports.register = (req, res) => {
  const { error, isValid } = validateRegister(req.body);
  const regex = new RegExp(
    /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[A-Za-z\d@$!%*#?&]{8,}$/
  );

  if (!isValid) {
    res.status(400).json(error);
    console.log(error);
  }

  if (!regex.test(req.body.password)) {
    console.log(req.body.password);
    return res.status(401).json({
      error:
        "Votre password doit contenir au moins 1 lettre minuscule, 1 lettre majuscule, 1 caractère numérique et de plus de 8 caractères",
    });
  }
  // hash du password du user
  let hash = bcrypt.hashSync(req.body.password, 10);
  req.body.password, (req.body.password2 = hash);
  req.body.role = "arttiste";

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(400).json({
        error: "Email déjà existant",
      });
    } else {
      let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then((data) => {
          res.status(200).json(data);
          console.log(data);
          console.log("Inscription effectué avec succès");
        })
        .catch((err) => {
          res.status(400).json(err);
          console.log(
            "Inscription non effectué : veuillez remplir tous les champs "
          );
          console.log(user);
          console.log(data);
        });
    }
  });
};

exports.login = (req, res) => {
  const { error, isValid } = validateLogin(req.body);

  if (!isValid) {
    res.status(400).json(error);
    console.log(error);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        error.email = "user not found";
        res.status(201).json({ adhesion: false, error: error });
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign({ id: user._id, role: user.role }, jwt_secret, {
            expiresIn: "24h",
          });
          let response = { user: user, adhesion: true, token: token };
          res.status(200).json(response);
          console.log("vous êtes bien connecté");
          console.log(user);
        } else {
          console.log("error result", result);
          res
            .status(400)
            .json({ err: "Veuillez entrez un email ou un password existant" });
        }
      });
    })
    .catch((err) => {
      console.log("error:", err);
      res.status(400).json(err);
    });
};

exports.admRegister = function (req, res) {
  console.log(
    adm_login,
    adm_password,
    "login:" + req.body.admLogin,
    "password:" + req.body.admPassword
  );

  if (req.body.admLogin == adm_login && req.body.admPassword == adm_password) {
    // hash du password du user
    let hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;
    req.body.role = "Admin";
    User.create(req.body, function (err, newUser) {
      if (err) {
        console.log(newUser);
        res.status(400).json(err);
      } else res.status(200).json(newUser);
    });
  } else {
    res.status(400).json("indentifiant incorrect");
  }
};
