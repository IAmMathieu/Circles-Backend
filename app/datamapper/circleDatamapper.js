const res = require("express/lib/response");
const client = require("../config/database");

const circleDatamapper = {
  async getCircle(id) {
    const query = {
      text: `SELECT DISTINCT 
              "circle".id AS circle_id,
              "circle".name,
              "circle".description,
              "circle".color,
              "circle".img_url,
              jsonb_agg(DISTINCT "user".*) AS admin,
              "circle".unique_code,
              "users_of_circle".users_count,
              "users",
              "futur_events",
              jsonb_agg(DISTINCT "event".*) AS events,
              jsonb_agg(DISTINCT "message".*) AS messages
            FROM "circle"
            LEFT JOIN "users_of_circle" ON circle_id = circle.id
            LEFT JOIN "events_by_circle" ON "events_by_circle".circle_id = circle.id
            LEFT JOIN "event" ON "event".circle_id = "circle".id
            LEFT JOIN "message" ON "message".circle_id = "circle".id
            JOIN "user" ON "circle".user_id = "user".id
            JOIN "circle_has_user" ON "circle_has_user".circle_id = "circle".id
            WHERE "circle".id = $1)
            GROUP BY "circle".id, "futur_events", "users"`,
      values: [id],
    };

    const circle = await client.query(query);
    return circle.rows[0];
  },

  async createCircle(circleData) {
    const query = {
      text: `INSERT INTO circle(name, description, color, img_url, user_id, unique_code) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [
        circleData.name,
        circleData.description,
        circleData.color,
        circleData.img_url,
        circleData.user_id,
        circleData.unique_code,
      ],
    };

    const circle = await client.query(query);

    if (circle.rows[0]) {
      circleDatamapper.addUserToCircle(
        circle.rows[0].user_id,
        circle.rows[0].unique_code
      );
    }

    return circle.rows[0];
  },

  async updateCircle(id, data) {
    const fields = Object.keys(data).map(
      (prop, index) => `"${prop}" = $${index + 1}`
    );
    const values = Object.values(data);

    const updatedCircle = await client.query(
      `UPDATE circle SET ${fields} WHERE id = $${
        fields.length + 1
      } RETURNING *`,
      [...values, id]
    );

    return updatedCircle.rows[0];
  },

  async deleteCircle(circleId, userId) {
    const circle = await client.query(
      "DELETE FROM circle WHERE circle.id = $1 AND circle.user_id = $2",
      [circleId, userId]
    );

    return !!circle.rowCount;
  },

  async getCircleByCode(code) {
    const query = {
      text: `SELECT *
                FROM "circle"
                WHERE "circle".unique_code= $1`,
      values: [code],
    };

    const circle = await client.query(query);

    return circle.rows[0];
  },

  async getCirclesForUser(userId) {
    const query = {
      text: `SELECT json_agg(circle.*) AS circles
      FROM "circle_has_user"
      JOIN "user" ON user_id = "user".id
      JOIN "circle" ON circle_id = circle.id
      WHERE "user".id = $1`,
      values: [userId],
    };

    const circles = await client.query(query);

    return circles.rows;
  },

  async getOneCircleForUser(circleId, userId) {
    const query = {
      text: `SELECT circle_id
      FROM "circle_has_user"
      JOIN "user" ON user_id = "user".id
      JOIN "circle" ON circle_id = circle.id
      WHERE "circle".id = $1 AND "user".id = $2`,
      values: [circleId, userId],
    };

    const circle = await client.query(query);

    return circle.rows[0];
  },

  async addUserToCircle(userId, uniqueCode) {
    const circle = await client.query(
      "SELECT circle.id FROM circle WHERE unique_code = $1",
      [uniqueCode]
    );

    const circleId = circle.rows[0].id;
    if (!circle) {
      res.status(502).send("No Circle with this Code.");
    } else {
      const getCircle = await circleDatamapper.getOneCircleForUser(
        circleId,
        userId
      );
      if (!getCircle) {
        const query = {
          text: `INSERT INTO "circle_has_user"(circle_id, user_id) VALUES ($1, $2) RETURNING *`,
          values: [circleId, userId],
        };

        const circle = await client.query(query);

        return circle.rows[0];
      }
    }
  },

  async removeUserFromCircle(userId, circleId) {
    const circle = await client.query(
      `DELETE FROM "circle_has_user" WHERE user_id = $1 and circle_id = $2`,
      [userId, circleId]
    );

    return !!circle.rowCount;
  },
};

module.exports = circleDatamapper;
