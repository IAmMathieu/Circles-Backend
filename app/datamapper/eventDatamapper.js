const client = require("../config/database");

const eventDatamapper = {
  async addEvent(circleData, circleId) {
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
        circleId,
        circleData.color,
      ],
    };

    const circle = await client.query(query);
    return circle.rows[0];
  },

  async patchEvent(data, eventId) {
    const fields = Object.keys(data).map((prop, index) => {
      if (prop == "allday") {
        return `"${prop}" = $${index + 1}`;
      } else if (prop == "user_id") {
        return `"${prop}" = COALESCE(NULLIF($${index + 1}, 0), "${prop}")`;
      } else {
        return `"${prop}" = COALESCE(NULLIF($${index + 1}, ''), "${prop}")`;
      }
    });

    const values = Object.values(data);

    const updatedEvent = await client.query(
      `UPDATE event SET ${fields} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, eventId]
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
  async oneEvent(eventId) {
    const query = {
      text: `SELECT * 
                FROM "event"
                WHERE "event".id = $1`,
      values: [eventId],
    };
    const oneEvent = await client.query(query);
    return oneEvent.rows[0];
  },

  async deleteEvent(eventId, userId) {
    const query = {
      text: `DELETE FROM "event"
                    WHERE "event".id = $1 AND user_id= $2`,
      values: [eventId, userId],
    };
    const event = await client.query(query);

    return !!event.rowCount;
  },
};

module.exports = eventDatamapper;
