const client = require("../config/database");

const circleDatamapper = {
  async getCircle(id) {
    const query = {
      text: `SELECT name, description, color, img_url, unique_code
                FROM "circle"
                WHERE "circle".id = $1`,
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

    if (circle) {
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
      text: `SELECT *
      FROM "user_belongsTo_circle"
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
      FROM "user_belongsTo_circle"
      JOIN "user" ON user_id = "user".id
      JOIN "circle" ON circle_id = circle.id
      WHERE "circle".id = $1 AND "user".id = $2`,
      values: [circleId, userId],
    };

    const circle = await client.query(query);

    return circle.rows[0];
  },

  async addUserToCircle(userId, uniqueCode) {
    const circleId = (
      await client.query(
        "SELECT circle.id FROM circle WHERE unique_code = $1",
        [uniqueCode]
      )
    ).rows[0];

    const getCircle = await circleDatamapper.getOneCircleForUser(
      circleId.id,
      userId
    );

    if (!getCircle) {
      const query = {
        text: `INSERT INTO "user_belongsTo_circle"(circle_id, user_id) VALUES ($1, $2) RETURNING *`,
        values: [circleId.id, userId],
      };

      const circle = await client.query(query);

      return circle.rows[0];
    }
  },

  async removeUserFromCircle(userId, circleId) {
    const circle = await client.query(
      `DELETE FROM "user_belongsTo_circle" WHERE user_id = $1 and circle_id = $2`,
      [userId, circleId]
    );

    console.log(!!circle.rowCount);

    return !!circle.rowCount;
  },
};

module.exports = circleDatamapper;
