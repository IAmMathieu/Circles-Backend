const client = require("../config/database");

const userDataMapper = {
  async getUser(email, password) {
    const query = {
      text: `SELECT * 
                FROM "user"
                WHERE "user".email = $1 AND "user".password = $2`,
      values: [email, password],
    };
    const user = await client.query(query);
    return user.rows[0];
  },

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
};

module.exports = userDataMapper;
