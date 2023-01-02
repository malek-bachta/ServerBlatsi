const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
//////////////////////////////////////////////////////////////////////////////
const app = express();
const PORT = process.env.PORT || 9090;
const databaseName = "warnMeBD";
//////////////////////////////////////////////////////////////////////////////
const dotenv = require("dotenv"); // Fichier .env (All My Secret Key)
dotenv.config();
//////////////////////////////////////////////////////////////////////////////
mongoose.set("debug", true);
mongoose.Promise = global.Promise;
//////////////////////////////////////////////////////////////////////////////
mongoose
  .connect("mongodb+srv://Blasti:8zrvdGnANcuAMtmr@db.83ixmgj.mongodb.net/BlastiDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((ex) => {
    console.log(ex);
    console.log("Unable to connect to database");
  });
//////////////////////////////////////////////////////////////////////////////
app.use(express.json());
app.use(morgan("dev")); // Utiliser morgan
app.use(express.urlencoded({ extended: true })); // Pour analyser application/x-www-form-urlencoded
//////////////////////////////////////////////////////////////////////////////
////////////////////Routes
app.use("/api/user", require("./routes/user.route"));
app.use("/api/movies", require("./routes/movies.route"));
app.use("/api/events", require("./routes/events.route"));
app.use("/api/shows", require("./routes/shows.route"));
app.use("/api/favoriteMovie", require("./routes/favoriteMovie.route"));
app.use("/api/favoriteEvent", require("./routes/favoriteEvent.route"));
app.use("/api/favoriteShow", require("./routes/favoriteShow.route"));
app.use("/api/reservation", require("./routes/reservation.route"));

//////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
