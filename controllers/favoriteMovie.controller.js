const { FavoriteMovie } = require("../models/favoriteMovie.model");
const { movies } = require("../models/movies.model");
var ObjectId = require("mongodb").ObjectID;
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const AddFavorite = async (req, res, next) => {
  const { idMovie, idUser } = req.body;
  if (!idMovie || !idUser) {
    res.json({ error: "please add all the feilds" });
  }
  //
  FavoriteMovie.findOne({
    idMovie: req.body.idMovie,
    idUser: req.body.idUser,
  }).then((pannn) => {
    if (pannn) {
      res.status(200).json({ message: "Favories Already Exist!" });
    } else {
      const movieData = new FavoriteMovie({
        idMovie: idMovie,
        idUser: idUser,
      });
      movieData
        .save()
        .then((user) => {
          res.status(200).json({ message: "Favories Has Been Added!" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const FavoritefindByUser = (req, res) => {
  FavoriteMovie.find({ idUser: req.body.idUser }).exec(function (
    err,
    dataFavorite
  ) {
    if (err) res.status(500).send(err);
    //else res.send(data);
    else {
      //data.idMovie;
      //res.status(200).send(data[0].idMovie.toString());
      console.log(dataFavorite);
      console.log(dataFavorite.length);
      let total = "";
      const List = [];
      if (dataFavorite.length > 0) {
        for (let i = 0; i < dataFavorite.length; i++) {
          total = dataFavorite[i].idMovie.toString();
          console.log(total);
          List.push(total);
        }
        console.log("aaaaaaaaaaaaa"+List);
        var obj_ids = List.map(function (id) {
          return ObjectId(id);
        }); 
        // db.test.find({ _id: { $in: obj_ids } });
        movies.find({ _id: { $in: obj_ids } }).exec(function (
          err,
          datamovies
        ) {
          if (err) res.status(500).send(err);
          else res.send(datamovies);
        });
      }
    }
  });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const FavoriteDelete = (req, res) => {
  FavoriteMovie.findOneAndRemove(
    { idMovie: req.body.idMovie, idUser: req.body.idUser },
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).json({ message: "Favoris Has been Deleted!" });
    }
  );
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const VerifFavorite = async (req, res, next) => {
  const { idMovie, idUser } = req.body;
  if (!idMovie || !idUser) {
    res.json({ error: "please add all the feilds" });
  }
  //
  FavoriteMovie.findOne({
    idMovie: req.body.idMovie,
    idUser: req.body.idUser,
  }).then((pannn) => {
    if (pannn) {
      res.status(200).json({ message: "Exist!" });
    } else {
      res.status(201).json({ message: "Not Exist!" });
    }
  });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
module.exports = {
  AddFavorite,
  FavoritefindByUser,
  FavoriteDelete,
  VerifFavorite,
};