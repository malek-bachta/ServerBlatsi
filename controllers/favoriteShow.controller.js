const { FavoriteShow } = require("../models/FavoriteShow.model");
const { shows } = require("../models/shows.model");
var ObjectId = require("mongodb").ObjectID;
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const AddFavorite = async (req, res, next) => {
  const { idShow, idUser } = req.body;
  if (!idShow || !idUser) {
    res.json({ error: "please add all the feilds" });
  }
  //
  FavoriteShow.findOne({
    idShow: req.body.idShow,
    idUser: req.body.idUser,
  }).then((pannn) => {
    if (pannn) {
      res.status(200).json({ message: "Favories Already Exist!" });
    } else {
      const showData = new FavoriteShow({
        idShow: idShow,
        idUser: idUser,
      });
      showData
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
  FavoriteShow.find({ idUser: req.body.idUser }).exec(function (
    err,
    dataFavorite
  ) {
    if (err) res.status(500).send(err);
    //else res.send(data);
    else {
      //data.idShow;
      //res.status(200).send(data[0].idShow.toString());
      console.log(dataFavorite);
      console.log(dataFavorite.length);
      let total = "";
      const List = [];
      if (dataFavorite.length > 0) {
        for (let i = 0; i < dataFavorite.length; i++) {
          total = dataFavorite[i].idShow.toString();
          console.log(total);
          List.push(total);
        }
        console.log("aaaaaaaaaaaaa"+List);
        var obj_ids = List.map(function (id) {
          return ObjectId(id);
        });
        // db.test.find({ _id: { $in: obj_ids } });
        shows.find({ _id: { $in: obj_ids } }).exec(function (
          err,
          datashows
        ) {
          if (err) res.status(500).send(err);
          else res.send(datashows);
        });
      }
    }
  });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const FavoriteDelete = (req, res) => {
  FavoriteShow.findOneAndRemove(
    { idShow: req.body.idShow, idUser: req.body.idUser },
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
  const { idShow, idUser } = req.body;
  if (!idShow || !idUser) {
    res.json({ error: "please add all the feilds" });
  }
  //
  FavoriteShow.findOne({
    idShow: req.body.idShow,
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