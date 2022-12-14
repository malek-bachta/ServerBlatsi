const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/events.controller");


router.get("/all", eventsController.ShowEvents);
router.post("/add", eventsController.AddEvent);
router.post("/update", eventsController.UpdateEvent);
router.delete("/delete", eventsController.deleteEvent);


module.exports = router;

