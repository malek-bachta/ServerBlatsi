const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies.controller");

var multer, storage, path, crypto;
multer = require("multer");
path = require("path");
crypto = require("crypto");
var fs = require("fs");
//
//configure multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/posts");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 9000000, // Max 9 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(undefined, true);
  },
});

router.get("/all", moviesController.ShowMovies);
//router.post("/add", moviesController.AddMovie);
router.post("/update", moviesController.UpdateMovie);
router.delete("/delete", moviesController.deletem);

router.post("/add", upload.single("image"), moviesController.AddMovie); // Upload Avatar

module.exports = router;
