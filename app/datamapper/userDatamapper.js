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
              VALUES ($1,$2,$3,$4,$5,$6)`,
      values: [
        userData.firstname,
        userData.lastname,
        userData.email,
        userData.password,
        userData.birthdate,
        userData.img_url,
      ],
    };

    return await client.query(query);
  },

  //Patch a user
  async patchUser(
    id,
    firstname,
    lastname,
    email,
    password,
    birthdate,
    img_url
  ) {
    const query = {
      text: `UPDATE "user" 
              SET "firstname" = $1,
              "lastname" = $2,
              "email" = $3,
              "password" = $4,
              "birthdate" = $5,
              "img_url" = $6
              WHERE "user".id = $7`,
      values: [firstname, lastname, email, password, birthdate, img_url, id],
    };
    return await client.query(query);
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
};

module.exports = userDataMapper;
