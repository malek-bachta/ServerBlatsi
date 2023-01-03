const { reservation } = require("../models/reservation.model");
const { events } = require("../models/events.model");
const { movies } = require("../models/movies.model");
const { shows } = require("../models/shows.model");
var ObjectId = require("mongodb").ObjectID;
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
          let totalshows = "";
          let totalMovies = "";
          let totalEvents = "";
          //
          const Listshows = [];
          const ListMovies = [];
          const ListEvents = [];
          if (dataReservation.length > 0) {
            for (let i = 0; i < dataReservation.length; i++) {
              if(dataReservation[i].idShow!=null){  
              totalshows = dataReservation[i].idShow.toString();
              Listshows.push(totalshows);
              console.log(totalshows);
             }
              ///
              if(dataReservation[i].idMovie!=null){
                totalMovies = dataReservation[i].idMovie.toString();
                ListMovies.push(totalMovies);
              }
              //
              if(dataReservation[i].idEvent!=null){
                totalEvents = dataReservation[i].idEvent.toString();
                ListEvents.push(totalEvents);
              }
            }
            var obj_idsshows = Listshows.map(function (id) {
              return ObjectId(id);
            });
             let aashows =  shows.find({ _id: { $in: obj_idsshows } })
            /////////////////////////////////////// 
              var obj_idsMovies = ListMovies.map(function (id) {
                return ObjectId(id);
              });
              let aaMovies =  movies.find({ _id: { $in: obj_idsMovies } })
            ///////////////////////////////////////
            var obj_idsEvents = ListEvents.map(function (id) {
                return ObjectId(id);
              });
              let aaEvents =  events.find({ _id: { $in: obj_idsEvents } })
            Promise.all([aashows, aaMovies,aaEvents]).then(result => {
                // do your things 
                //results will be array and you can get 
                //response of prom1 in result[0]
                //response of prom1 in result[1]
                 //pass the data to view
                 res.send({result});
             }).catch(err => {
          //handle your error here
              // console.log(Error : ${err});
             })
                      
        


          }
        }
      })};
//addReservation movie
const AddReservationM = async (req, res, next) => {
    const { idMovie, idUser, seats } = req.body;
    if (!idMovie || !idUser || !seats) {
        res.json({ error: "please add all the feilds" });
    }
    
     else
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
    else
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
  


