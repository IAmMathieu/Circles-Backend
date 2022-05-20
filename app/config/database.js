const { Pool } = require("pg");

const client = new Pool({
  connectionString: process.env.TEST_DATABASE_URL,
  // host: process.env.PGHOST,
  // user: process.env.PGUSER,
  // password: process.env.PGPASSWORD,
  // port: process.env.PGPORT,
  // database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

module.exports = client;
