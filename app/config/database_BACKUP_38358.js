const { Pool } = require("pg");

const client = new Pool({
<<<<<<< HEAD
  connectionString : process.env.DATABASE_URL,
  /*host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,*/
=======
<<<<<<< HEAD
  connectionString: process.env.DATABASE_URL,
  // host: process.env.PGHOST,
  // user: process.env.PGUSER,
  // password: process.env.PGPASSWORD,
  // port: process.env.PGPORT,
  // database: process.env.PGDATABASE,
=======
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
>>>>>>> 337f88c (Basic structure of the API  app)
>>>>>>> feature/circle
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

<<<<<<< HEAD
module.exports = client;
=======
module.exports = client;
>>>>>>> 337f88c (Basic structure of the API  app)
