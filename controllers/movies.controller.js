const { movies } = require("../models/movies.model");

//GetAllMovies
const ShowMovies = (req, res) => {
  movies
    .find({})
    .sort({ _id: -1 })
    .exec(function (err, data) {
      if (err) res.status(500).send(err);
      if (data.length == 0) {
        res.json({ message: "There is No movie Yet" });
      } else res.send(data);
    });
};

//addMovie
const AddMovie = async (req, res, next) => {
  const {
    title,
    date,
    description,
    genre,
    image,
    video,
    rating,
    duration,
    language,
    production,
  } = req.body;
  if (!title || !description || !genre) {
    res.json({ error: "please add all the feilds" });
  }
  const movie = await movies.findOne({ title: title });
  if (movie) {
    res.json({ error: "This movie exists" });
  } else
    try {
      const movie = new movies({
        title,
        date,
        description,
        genre,
        image,
        video,
        rating,
        duration,
        language,
        production,
      });
      movie
        .save()
        .then((movie) => {
          res.json({ message: "Movie added successfully!" });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      res.status(500).json(err);
    }
};

//DeleteMovie
const deletem = (req, res) => {
  var id = req.body._id;
  movies.findOneAndRemove({ _id: id }, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
  });
};

//UpdateMovie
const UpdateMovie = (req, res) => {
  const { _id } = req.params;
  const {
    title,
    date,
    description,
    genre,
    image,
    video,
    rating,
    duration,
    writer,
    director,
    production,
  } = req.body;
  if (!title || !date || !description || !genre || !image) {
    res.json({ error: "please add all the feilds" });
  }
  movies.findByIdAndUpdate(
    _id,
    {
      title,
      date,
      description,
      genre,
      image,
      video,
      rating,
      duration,
      writer,
      director,
      production,
    },
    (err, data) => {
      if (err) res.status(500).send;
      if (!data) {
        res.json({ message: "Movie Not Found" });
      } else res.json({ message: "Movie Updated" });
    }
  );
};

module.exports = {
  ShowMovies,
  AddMovie,
  UpdateMovie,
  deletem,
};
