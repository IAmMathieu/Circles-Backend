const sanitizeHtml = require("sanitize-html");
const eventDatamapper = require("../datamapper/eventDatamapper");

const eventController = {
  async addEvent(req, res) {
    req.body.circle_id = req.params.circle_id;
    req.body.title = sanitizeHtml(req.body.title);
    req.body.description = sanitizeHtml(req.body.description);
    req.body.color = sanitizeHtml(req.body.color);

    const addEvent = await eventDatamapper.addEvent(req.body);

    res.json(addEvent);
  },

  async patchEvent(req, res) {
    const userId = req.params.id;
    const eventId = req.params.event_id;

    req.body.title = sanitizeHtml(req.body.title);
    req.body.description = sanitizeHtml(req.body.description);
    req.body.color = sanitizeHtml(req.body.color);

    const patchEvent = await eventDatamapper.patchEvent(
      req.body,
      userId,
      eventId
    );
    res.json(patchEvent);
  },

  async allEvent(req, res) {
    const circleId = req.params.circle_id;
    const allEvent = await eventDatamapper.allEvent(circleId);
    res.json(allEvent);
  },

  async oneEvent(req, res) {
    const eventId = req.params.event_id;
    const oneEvent = await eventDatamapper.oneEvent(eventId);
    res.json(oneEvent);
  },

  async deleteEvent(req, res) {
    const eventId = req.params.event_id;
    const deleteEvent = await eventDatamapper.deleteEvent(eventId, req.body);
    if (deleteEvent) {
      res.send("Event is deleted");
    } else {
      res.send("Error, event can't be deleted ");
    }
  },
};

module.exports = eventController;
