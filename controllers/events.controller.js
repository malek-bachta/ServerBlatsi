const { events } = require("../models/events.model");

//get all events
const ShowEvents = (req, res) => {
  events
    .find({})
    .sort({ _id: -1 })
    .exec(function (err, data) {
      if (err) res.status(500).send(err);
      if (data.length == 0) {
        res.json({ message: "There is No events Yet" });
      } else res.send(data);
    });
};

//addevent
const AddEvent = async (req, res, next) => {
  const { title, date, adress, type, cost, description, guest, pAvailable, image } =
    req.body;
  if (!title || !adress || !type ) {
    res.json({ error: "please add all the feilds" });
  }
  const event = await events.findOne({ title: title });
  if (event) {
    res.json({ error: "This event exists" });
  } else
    try {
      const event = new events({
        title,
        date,
        adress,
        type,
        cost,
        description,
        guest,
        pAvailable,
        image,
      });
      event
        .save()
        .then((event) => {
          res.json({ message: "event added successfully!" });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      res.status(500).json(err);
    }
};

//Deleteevent
const deleteEvent = (req, res) => {
  var id = req.body._id;
  events.findOneAndRemove({ _id: id }, function (err) {
    if (err) {
      console.log(err);
      return res.json({ error: "please add all the feilds" });
    }
    return res.status(200).send();
  });
};

//Updateevent
const UpdateEvent = (req, res) => {
  const { _id } = req.params;
  const { title, date, adress, type, cost, description, guest, pAvailable, image } =
    req.body;
  if (!title || !adress || !type || !cost) {
    res.json({ error: "please add all the feilds" });
  }
  events.findByIdAndUpdate(
    req.body._id,
    {
      title,
      date,
      adress,
      type,
      cost,
      description,
      guest,
      pAvailable,
      image,
    },
    (err, data) => {
      if (err) res.status(500).send;
      if (!data) {
        res.json({ message: "event Not Found" });
      } else res.json({ message: "event Updated" });
    }
  );
};

module.exports = {
  ShowEvents,
  AddEvent,
  UpdateEvent,
  deleteEvent,
};
