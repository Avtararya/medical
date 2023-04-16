import { Pool } from "pg";

// Replace with your PostgreSQL database credentials
const pool = new Pool({
  user: "Postgres",
  host: "localhost",
  database: "mediscus",
  password: "123",
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database!");

  pool.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    console.log(res.rows);
    pool.end();
  });
});

// Store the access token in the database
const storeAccessToken = async (token) => {
  try {
    const query = {
      text: "INSERT INTO access_tokens(token) VALUES($1)",
      values: [token],
    };
    await pool.query(query);
    console.log("Access token stored successfully");
  } catch (err) {
    console.error("Error storing access token:", err);
  }
};

// Get the access token from the database
const getStoredAccessToken = async () => {
  try {
    const query = {
      text: "SELECT token FROM access_tokens LIMIT 1",
    };
    const result = await pool.query(query);
    if (result.rows.length === 0) {
      return null;
    } else {
      return result.rows[0].token;
    }
  } catch (err) {
    console.error("Error getting stored access token:", err);
    return null;
  }
};

module.exports = { storeAccessToken, getStoredAccessToken };
