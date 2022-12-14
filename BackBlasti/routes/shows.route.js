const express = require("express");
const router = express.Router();
const showsController = require("../controllers/shows.controller");



router.get("/all", showsController.AffShows);
router.post("/add", showsController.AddShow);
router.post("/update", showsController.UpdateShow);
router.delete("/delete", showsController.deleteShow);


module.exports = router;
