const client = require("../config/database");

const chatDatamapper = {
  async addMessageInCircle(content, userId, circleCode) {
    const query = {
      text: `INSERT INTO "message"(content,user_id,circle_id)
                    VALUES ($1,$2, (SELECT "circle".id FROM "circle" WHERE unique_code = $3)) RETURNING * `,
      values: [content, userId, circleCode],
    };
    const addMessage = await client.query(query);
    return addMessage.rows[0];
  },

  async updateMessage(messageId, data) {
    const query = {
      text: `UPDATE "message" SET "message".content = $1 WHERE "message".id = $2 AND "message".user_id = $3`,
      values: [data.text, messageId, data.user_id],
    };

    const updatedMessage = await client.query(query);

    return updatedMessage.rows[0];
  },

  async deleteMessage(messageId, data) {
    const query = {
      text: `DELETE FROM "message" WHERE "message".id = $2 AND "message".user_id = $3`,
      values: [messageId, data.user_id],
    };

    const deletedMessage = await client.query(query);

    return !!deletedMessage.rowCount;
  },
};

module.exports = chatDatamapper;
