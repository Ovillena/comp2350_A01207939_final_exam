const mysql = require("mysql2");

require("dotenv").config();

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
  host: "us-cdbr-east-03.cleardb.com",
  user: "b762967cfa65b8",
  password: "2391fbbd",
  database: "heroku_545694f0e4d4311",
  multipleStatements: false,
  namedPlaceholders: true,
};

const dbConfigLocal = {
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: process.env.DB,
  multipleStatements: false,
  namedPlaceholders: true,
};

if (is_heroku) {
  var database = mysql.createPool(dbConfigHeroku);
} else {
  var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
