const client = require("../config/database");

const userDataMapper = {
  //Find a user by email and his password
  async getUser(email) {
    const query = {
      text: `SELECT * 
                FROM "user"
                WHERE "user".email = $1`,
      values: [email],
    };
    const user = await client.query(query);
    return user.rows[0];
  },

  async getUserById(id) {
    const query = {
      text: `SELECT *
                FROM "user"
                WHERE "user".id=$1`,
      values: [id],
    };

    const user = await client.query(query);
    return user.rows[0];
  },

  //Find a user by id
  async getUserInfo(id) {
    const query = {
      text: `SELECT firstname, lastname, surname, email, birthdate
                FROM "user"
                WHERE "user".id = $1`,
      values: [id],
    };

    const user = await client.query(query);
    return user.rows[0];
  },

  //Create a user
  async createUser(userData) {
    const query = {
      text: `INSERT INTO "user" ("firstname","lastname", "email", "password", "birthdate","img_url")
              VALUES ($1,$2,$3,$4,$5,$6) RETURNING "user".id as user_id, "user".firstname, "user".lastname, "user".email, "user".birthdate, "user".img_url`,
      values: [
        userData.firstname,
        userData.lastname,
        userData.email,
        userData.password,
        userData.birthdate,
        userData.img_url,
      ],
    };

    return (await client.query(query)).rows[0];
  },

  //Patch a user
  async patchUser(id, data) {
    const fields = Object.keys(data).map(
      (prop, index) => `"${prop}" = $${index + 1}`
    );

    console.log(fields);
    const values = Object.values(data);

    const updatedUser = await client.query(
      `UPDATE "user" SET ${fields} WHERE id = $${
        fields.length + 1
      } RETURNING *`,
      [...values, id]
    );

    return updatedUser.rows[0];
  },

  //Delete a user

  async deleteUser(id) {
    const query = {
      text: `DELETE FROM "user" 
              WHERE "user".id = $1`,
      values: [id],
    };
    return await client.query(query);
  },

  async getAllInfosFromUserId(userId) {
    const query = {
      text: `SELECT DISTINCT 
      "circle".id AS circle_id,
      "circle".name,
      "circle".description,
      "circle".color,
      "circle".user_id AS "admin",
      "circle".unique_code,
      events,
      messages
    FROM "circle"
    LEFT JOIN "calendar_of_circle" ON "calendar_of_circle".circle_id = "circle".id
    LEFT JOIN "chat_of_circle" ON "chat_of_circle".circle_id = "circle".id
    WHERE "circle".id = ANY (SELECT "circle".id
          FROM "user_belongsTo_circle"
          JOIN "user" ON user_id = "user".id
          JOIN "circle" on circle_id = "circle".id
          WHERE "user".id = $1)
    ORDER BY "circle".id`,
      values: [userId],
    };

    const data = await client.query(query);

    return data.rows;
  },
};

module.exports = userDataMapper;
