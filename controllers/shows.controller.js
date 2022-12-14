const { shows } = require("../models/shows.model");

//GetAllShows
const AffShows = (req, res) => {
  shows
    .find({})
    .sort({ _id: -1 })
    .exec(function (err, data) {
      if (err) res.status(500).send(err);
      if (data.length == 0) {
        res.json({ message: "There is No Show Yet" });
      } else res.send(data);
    });
};

//addShow
const AddShow = async (req, res, next) => {
  const {
    title,
    date,
    genre,
    description,
    image,
    place,
    actors,
  } = req.body;
  if (!title || !description || !genre) {
    res.json({ error: "please add all the fields" });
  }
  const show = await shows.findOne({ title: title });
  if (show) {
    res.json({ error: "This show exists" });
  } else
    try {
      const show = new shows({
      title,
      date,
      genre,
      description,
      image,
      place,
      actors,
      });
      show
        .save()
        .then((show) => {
          res.json({ message: "Show added successfully!" });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      res.status(500).json(err);
    }
};

//DeleteShow
const deleteShow = (req, res) => {
  var id = req.body._id;
  shows.findOneAndRemove({ _id: id }, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.json({ message: "Show deleted successfully!" });
    });
  
};

//UpdateShow
const UpdateShow = (req, res) => {
  const { _id } = req.params;
  const { title, date, genre, description, image,place, actors } =
    req.body;
  if (!title || !date || !genre || !place) {
    res.json({ error: "please add all the feilds" });
  }
  shows.findByIdAndUpdate(
    req.body._id,
    {
      title,
      date,
      genre,
      description,
      image,
      place,
      actors,
    },
    (err, data) => {
      if (err) res.status(500).send;
      if (!data) {
        res.json({ message: "show Not Found" });
      } else res.json({ message: "show Updated" });
    }
  );
};


module.exports = {
  AffShows,
  AddShow,
  UpdateShow,
  deleteShow,
};
