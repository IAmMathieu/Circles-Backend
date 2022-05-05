const { Pool } = require("pg");

const client = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

<<<<<<< HEAD
module.exports = client;
=======
module.exports = client;
>>>>>>> develop
