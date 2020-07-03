const Article = require("../models/article"),
  User = require("../models/user"),
  jwt = require("jsonwebtoken"),
  jwt_secret = process.env.JWT_SECRET_KEY;

exports.newArticle = function (req, res) {
  header = req.headers.authorization;
  const token = header.split(" ")[1];

  jwt.verify(token, jwt_secret, function (err, decoded) {
    // verification du token en utilisant bearer token dans les autorisation de la requête
    if (err) {
      res.status(401).json("no token provided");
    } else {
      let article = new Article({
        title: req.body.title,
        content: req.body.content,
        artistePseudo: req.body.artistePseudo,
        artisteName: req.body.artisteName,
        image: req.file ? req.file.filename : undefined,
      });
      article
        .save({ _id: decoded.id })
        .then((newArticle) => {
          if (decoded.role === "Admin") {
            // verificaion rôle, récupération de l'id du projet créé
            console.log("req file:", req.file);
            User.updateOne(
              { _id: decoded.id },
              { $push: { articleId: newArticle } }
            )
              .then((data) => {
                res.status(200).json(data);
              })
              .catch((err) => {
                console.log("req file:", req.file);
                console.log(err);
                res.status(400).json(err);
              });
          }
        })
        .catch((err) => {
          console.log("req file:", req.file);
          res.status(400).json(err);
        });
    }
  });
};

exports.getAllArticles = function (req, res) {
  Article.find()
    .then((article) => {
      console.log(article);
      res.status(200).json(article);
    })
    .catch((err) => {
      console.log(res);
      res.status(400).json(err);
    });
};

exports.getArticleById = function (req, res) {
  Article.findOne({ _id: req.params.id }, function (err, article) {
    if (err) {
      console.log(res);
      res.status(400).json(err);
    } else {
      console.log(article);
      res.status(200).json(article);
    }
  });
  // .then((article) => {
  //   console.log(article);
  //   res.status(200).json(article);
  // })
  // .catch((err) => {
  //   console.log(res);
  //   res.status(400).json(err);
  // });
};

exports.updateArticle = function (req, res) {
  header = req.headers.authorization;
  const token = header.split(" ")[1];

  jwt.verify(token, jwt_secret, function (err, decoded) {
    if (err) {
      res.status(401).json("no token provided");
      return false;
    } else if (decoded.id) {
      let { title, content, artistePseudo, artisteName } = req.body;
      let image = req.file.filename;

      Article.updateOne(
        { _id: req.params.id },
        {
          $set: {
            title: title,
            content: content,
            artistePseudo: artistePseudo,
            artisteName: artisteName,
            image: image,
          },
        },
        function (err, data) {
          if (err) {
            console.log("update du project fail");
            console.log("error data:", data);
            res.status(204).json(err);
          } else {
            console.log(data);
            res.status(200).json(data);
          }
        }
      );
    }
  });
};

exports.deleteArticle = function (req, res) {
  header = req.headers.authorization;
  const token = header.split(" ")[1];

  jwt.verify(token, jwt_secret, function (err, decoded) {
    if (err) {
      res.status(401).json("no token provided");
      return false;
    } else if (decoded.role === "Admin") {
      Article.deleteOne({ _id: req.params.id }, function (err, data) {
        if (err) {
          console.log(err);
          res.status(400).json(err);
        } else {
          console.log("le projet a été supprimé avec succès");
          res.status(200).json(data);
        }
      });
    }
  });
};

// if(req.file === undefined){
//     console.log("multer req: ", req.file)
//     res.status(200).json(data)
// }else{
//     console.log("multer req: ", req.file)
//     res.status(200).json(data)
// }
