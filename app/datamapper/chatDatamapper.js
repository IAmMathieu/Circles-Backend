const client = require("../config/database");

const chatDatamapper = {
  async addMessageInCircle(content, userId, circleCode) {
    const query = {
      text: `INSERT INTO "message"(content,user_id,circle_id)
                    VALUES ($1,$2, (SELECT "circle".id FROM "circle" WHERE unique_code = $3)) `,
      values: [content, userId, circleCode],
    };
    const addMessage = await client.query(query);
    return addMessage.rows[0];
  },
};

module.exports = chatDatamapper;
