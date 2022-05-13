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
      text: `SELECT firstname, lastname, surname, email, birthdate, img_url 
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
      text: `SELECT firstname, lastname, surname, email, birthdate, img_url
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
      text: `INSERT INTO "user" ("firstname","lastname", "surname", "email", "password", "birthdate","img_url")
              VALUES ($1,$2,$3,$4,$5,$6, $7) RETURNING "user".id as user_id, "user".firstname, "user".lastname, "user".surname, "user".email, "user".birthdate, "user".img_url`,
      values: [
        userData.firstname,
        userData.lastname,
        userData.surname,
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
              "circle".img_url,
              "admin",
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
            JOIN "admin_of_circle" ON "admin_of_circle".circle_id = circle.id
            WHERE "circle".id = ANY (SELECT "circle".id
                                  FROM "circle_has_user"
                                  JOIN "user" ON user_id = "user".id
                                  JOIN "circle" on circle_id = "circle".id
                                  WHERE "user".id = $1)
            GROUP BY "circle".id, "futur_events", "users", "users_of_circle".users_count, "admin"`,
      values: [userId],
    };

    const data = await client.query(query);

    return data.rows;
  },
};

module.exports = userDataMapper;
