const { reservation } = require("../models/reservation.model");

//GetAllReservation
const ShowReservationByUser = (req, res) => {
    reservation.find({ idUser: req.body.idUser }).exec(function (
        err,
        dataReservation
      ) {
        if (err) res.status(500).send(err);
        else {
          console.log(dataReservation);
          console.log(dataReservation.length);
          let total = "";
          const List = [];
          if (dataReservation.length > 0) {
            for (let i = 0; i < dataReservation.length; i++) {
              total = dataReservation[i].idEvent.toString();
              console.log(total);
              List.push(total);
            }
            console.log("aaaaaaaaaaaaa"+List);
            var obj_ids = List.map(function (id) {
              return ObjectId(id);
            });
            events.find({ _id: { $in: obj_ids } }).exec(function (
              err,
              dataevents
            ) {
              if (err) res.status(500).send(err);
              else res.send(dataevents);
            });
          }
        }
      })};
//addReservation movie
const AddReservationM = async (req, res, next) => {
    const { idMovie, idUser, seats } = req.body;
    if (!idMovie || !idUser || !seats) {
        res.json({ error: "please add all the feilds" });
    }
    const movie = await reservation.findOne({ idMovie: idMovie });
    if (movie) {
        res.json({ error: "This reservation exists" });
    } else
        try {
            const movieData = new reservation({
                idMovie: idMovie,
                idUser: idUser,
                seats: seats,
            });
            movieData
                .save()
                .then((movie) => {
                    res.json({ message: "Reservation added successfully!" });
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            res.status(500).json(err);
        }
    };  

//addReservation event
const AddReservationE = async (req, res, next) => {
    const { idEvent, idUser, seats } = req.body;
    if (!idEvent || !idUser || !seats) {
        res.json({ error: "please add all the feilds" });
    }
    const event = await reservation.findOne({ idEvent: idEvent });
    if (event) {
        res.json({ error: "This reservation exists" });
    } else
        try {
            const eventData = new reservation({
                idEvent: idEvent,
                idUser: idUser,
                seats: seats,
            });
            eventData
                .save()
                .then((event) => {
                    res.json({ message: "Reservation added successfully!" });
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            res.status(500).json(err);
        }
    };

//addReservation show
const AddReservationS = async (req, res, next) => {
    const { idShow, idUser, seats } = req.body;
    if (!idShow || !idUser || !seats) {
        res.json({ error: "please add all the feilds" });
    }
    const show = await reservation.findOne({ idShow: idShow });
    if (show) {
        res.json({ error: "This reservation exists" });
    }
    else
        try {
            const showData = new reservation({
                idShow: idShow,
                idUser: idUser,
                seats: seats,
            });
            showData
                .save()
                .then((show) => {
                    res.json({ message: "Reservation added successfully!" });
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            res.status(500).json(err);
        }
    };


module.exports = {
    ShowReservationByUser,
    AddReservationM,
    AddReservationE,
    AddReservationS,
  };
  


