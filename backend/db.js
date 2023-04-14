const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Dj840511$",
  database: "marvelous",
});

pool.query = util.promisify(pool.query);

const createTodoTable = `CREATE TABLE IF NOT EXISTS todo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  done BOOLEAN NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

pool
  .query(createTodoTable)
  .then(() => {
    console.log("Todo table created");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = pool;
