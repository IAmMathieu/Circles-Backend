const sanitizeHtml  =  require ('sanitize-html') ;
const eventDataMapper = require("../datamapper/eventDatamapper");

const eventController = {
  async addEvent(req, res) {
    const userId = req.params.id;
    req.body.title = sanitizeHtml(req.body.title);
    req.body.description = sanitizeHtml(req.body.description);
    req.body.color = sanitizeHtml(req.body.color);
    const addEvent = await eventDataMapper.addEvent(req.body, userId);
    res.json(addEvent);
  },

  async patchEvent(req, res) {
    const userId = req.params.id;
    const eventId = req.params.event_id;

    req.body.title = sanitizeHtml(req.body.title);
    req.body.description = sanitizeHtml(req.body.description);
    req.body.color = sanitizeHtml(req.body.color);

    const patchEvent = await eventDataMapper.patchEvent(
      req.body,
      userId,
      eventId
    );
    res.json(patchEvent);
  },

  async allEvent(req, res) {
    const circleId = req.params.circle_id;
    const allEvent = await eventDataMapper.allEvent(circleId);
    res.json(allEvent);
  },

  async oneEvent(req, res) {
    const eventId = req.params.event_id;
    const oneEvent = await eventDataMapper.oneEvent(eventId);
    res.json(oneEvent);
  },

  async deleteEvent(req, res) {
    const eventId = req.params.event_id;
    const deleteEvent = await eventDataMapper.deleteEvent(eventId, req.body);
    if (deleteEvent) {
      res.send("Event is deleted");
    } else {
      res.send("Error, event can't be deleted ");
    }
  },
};

module.exports = eventController;
