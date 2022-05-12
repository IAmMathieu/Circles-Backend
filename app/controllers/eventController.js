const eventDatamapper = require("../datamapper/eventDatamapper");

const eventController = {
  async addEvent(req, res) {
    const circleId = req.params.id;
    const addEvent = await eventDatamapper.addEvent(req.body, circleId);
    res.json(addEvent);
  },

  async patchEvent(req, res) {
    const circleId = req.params.circle_id;
    req.body.event_id = req.params.event_id;
    console.log(req.body);

    const patchEvent = await eventDatamapper.patchEvent(req.body, circleId);
    res.json(patchEvent);
  },

  async allEvent(req, res) {
    const circleId = req.params.id;
    const allEvent = await eventDatamapper.allEvent(circleId);
    res.json(allEvent);
  },

  async oneEvent(req, res) {
    const eventId = req.params.event_id;
    const circleId = req.params.circle_id;
    const oneEvent = await eventDatamapper.oneEvent(eventId, circleId);
    res.json(oneEvent);
  },

  async deleteEvent(req, res) {
    const eventId = req.params.event_id;
    const circleId = req.params.circle_id;
    const userId = req.body.user_id;
    const deleteEvent = await eventDatamapper.deleteEvent(
      eventId,
      circleId,
      userId
    );
    if (deleteEvent) {
      res.status(200).send("Event is deleted");
    } else {
      res.status(400).send("Error, event can't be deleted ");
    }
  },
};

module.exports = eventController;
