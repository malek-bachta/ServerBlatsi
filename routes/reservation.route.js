const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation.controller");

router.post("/all", reservationController.ShowReservationByUser);
router.post("/addM", reservationController.AddReservationM);
router.post("/addE", reservationController.AddReservationE);
router.post("/addS", reservationController.AddReservationS);

module.exports = router;


