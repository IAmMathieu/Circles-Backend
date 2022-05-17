const client = require("../config/database");

const eventDatamapper = {
  async addEvent(circleData) {
    console.log("Dans le dataMapper: " + circleData);
    const query = {
      text: `INSERT INTO "event" ("title","start","end","description","allday","user_id", "circle_id", "color")
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      values: [
        circleData.title,
        circleData.start,
        circleData.end,
        circleData.description,
        circleData.allday,
        circleData.user_id,
        circleData.circle_id,
        circleData.color,
      ],
    };

    const circle = await client.query(query);
    return circle.rows[0];
  },

  async patchEvent(data, circleId) {
    const fields = Object.keys(data).map(
      (prop, index) => `"${prop}" = $${index + 1}`
    );
    const values = Object.values(data);

    const updatedEvent = await client.query(
      `UPDATE event SET ${fields} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, circleId]
    );

    return updatedEvent.rows[0];
  },

  async allEvent(circleId) {
    const query = {
      text: `SELECT * 
                FROM "event"
                WHERE circle_id = $1
                `,
      values: [circleId],
    };
    const allEvent = await client.query(query);
    return allEvent.rows;
  },
  async oneEvent(eventId, circleId) {
    const query = {
      text: `SELECT * 
                FROM "event"
                WHERE "event".id = $1 AND circle_id = $2`,
      values: [eventId, circleId],
    };
    const oneEvent = await client.query(query);
    return oneEvent.rows[0];
  },

  async deleteEvent(eventId, circleId, userId) {
    const query = {
      text: `DELETE FROM "event"
                    WHERE "event".id = $1 AND circle_id = $2 AND user_id= $3`,
      values: [eventId, circleId, userId],
    };
    const event = await client.query(query);

    return !!event.rowCount;
  },
};

module.exports = eventDatamapper;
