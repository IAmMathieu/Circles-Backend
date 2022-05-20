require("dotenv").config();
const { Pool } = require("pg");

describe("Testing Postgres", () => {
  let pgPool;

  beforeAll(() => {
    pgPool = new Pool({
      connectionString: process.env.TEST_DATABASE_URL,
    });
  });

  afterAll(async () => {
    await pgPool.end();
  });

  it("should connect to DB and return result", async () => {
    const client = await pgPool.connect();

    try {
      await client.query("BEGIN");

      const { rows } = await client.query('SELECT 1 AS "result"');
      expect(rows[0]["result"]).toBe(1);

      await client.query("ROLLBACK");
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  });
});
