const { FavoriteEvent } = require("../models/FavoriteEvent.model");
const { events } = require("../models/events.model");
var ObjectId = require("mongodb").ObjectID;
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const AddFavorite = async (req, res, next) => {
  const { idEvent, idUser } = req.body;
  if (!idEvent || !idUser) {
    res.json({ error: "please add all the feilds" });
  }
  //
  FavoriteEvent.findOne({
    idEvent: req.body.idEvent,
    idUser: req.body.idUser,
  }).then((pannn) => {
    if (pannn) {
      res.status(200).json({ message: "Favories Already Exist!" });
    } else {
      const eventData = new FavoriteEvent({
        idEvent: idEvent,
        idUser: idUser,
      });
      eventData
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
  FavoriteEvent.find({ idUser: req.body.idUser }).exec(function (
    err,
    dataFavorite
  ) {
    if (err) res.status(500).send(err);
    //else res.send(data);
    else {
      //data.idEvent;
      //res.status(200).send(data[0].idEvent.toString());
      console.log(dataFavorite);
      console.log(dataFavorite.length);
      let total = "";
      const List = [];
      if (dataFavorite.length > 0) {
        for (let i = 0; i < dataFavorite.length; i++) {
          total = dataFavorite[i].idEvent.toString();
          console.log(total);
          List.push(total);
        }
        console.log("aaaaaaaaaaaaa"+List);
        var obj_ids = List.map(function (id) {
          return ObjectId(id);
        });
        // db.test.find({ _id: { $in: obj_ids } });
        events.find({ _id: { $in: obj_ids } }).exec(function (
          err,
          dataevents
        ) {
          if (err) res.status(500).send(err);
          else res.send(dataevents);
        });
      }
    }
  });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const FavoriteDelete = (req, res) => {
  FavoriteEvent.findOneAndRemove(
    { idEvent: req.body.idEvent, idUser: req.body.idUser },
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
  const { idEvent, idUser } = req.body;
  if (!idEvent || !idUser) {
    res.json({ error: "please add all the feilds" });
  }
  //
  FavoriteEvent.findOne({
    idEvent: req.body.idEvent,
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