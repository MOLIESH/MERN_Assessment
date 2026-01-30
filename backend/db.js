const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "moliesh",
  password: "moliesh@11",
  database: "products_db",
});

module.exports = db;

