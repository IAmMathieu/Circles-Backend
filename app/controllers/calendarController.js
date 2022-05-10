const calendarDataMapper = require("../datamapper/calendarDatamapper");

const calendarController = {
  async addEvent(req, res) {
    const userId = req.params.id;
    const addEvent = await calendarDataMapper.addEvent(req.body, userId);
    res.json(addEvent);
  },

  async patchEvent(req, res) {
    const userId = req.params.id;
    const eventId = req.params.event_id;

    const patchEvent = await calendarDataMapper.patchEvent(
      req.body,
      userId,
      eventId
    );
    res.json(patchEvent);
  },

  async allEvent(req, res) {
    const circleId = req.params.circle_id;
    const allEvent = await calendarDataMapper.allEvent(circleId);
    res.json(allEvent);
  },

  async oneEvent(req, res) {
    const eventId = req.params.event_id;
    const oneEvent = await calendarDataMapper.oneEvent(eventId);
    res.json(oneEvent);
  },

  async deleteEvent(req, res) {
    const eventId = req.params.event_id;
    const deleteEvent = await calendarDataMapper.deleteEvent(eventId, req.body);
    if (deleteEvent) {
      res.send("Event is deleted");
    } else {
      res.send("Error, event can't be deleted ");
    }
  },
};

module.exports = calendarController;
