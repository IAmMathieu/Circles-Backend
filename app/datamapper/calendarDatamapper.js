const client = require("../config/database");

const calendarDataMapper = {
  async addEvent(data, id) {
    const query = {
      text: `INSERT INTO "event" ("title","start","end","description","allday","user_id","color")
                    VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      values: [
        data.title,
        data.start,
        data.end,
        data.description,
        data.allday,
        id,
        data.color,
      ],
    };
    return await client.query(query);
  },

  async patchEvent(data, userId, eventId) {
    const query = {
      text: `UPDATE "event" 
                    SET "title" = $1,
                    "start" = $2,
                    "end" = $3,
                    "description" = $4,
                    "allday" = $5,
                    "user_id" = $6,
                    "color" = $7
                    WHERE "event".id = $8 RETURNING *`,
      values: [
        data.title,
        data.start,
        data.end,
        data.description,
        data.allday,
        userId,
        data.color,
        eventId,
      ],
    };
    return await client.queryno(query);
  },

  async allEvent(circleId) {
    const query = {
      text: `SELECT * 
                FROM "calendar"
                JOIN "event" ON event_id = "event".id
                JOIN "circle" ON circle_id = "circle".id
                WHERE "circle".id = $1
                `,
      values: [circleId],
    };
    const allEvent = await client.query(query);
    return allEvent.rows;
  },
  async oneEvent(id) {
    const query = {
      text: `SELECT * 
                FROM "event"
                WHERE "event".id = $1`,
      values: [id],
    };
    const oneEvent = await client.query(query);
    return oneEvent.rows[0];
  },

  async deleteEvent(eventId, userId) {
    const query = {
      text: `DELETE FROM "event"
                    WHERE "event".id = $1 AND user_id = $2`,
      values: [eventId, userId],
    };
    return await client.query(query);
  },
};

module.exports = calendarDataMapper;
