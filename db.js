const mysql = require("mysql");
const Sequelize = require("sequelize");

require("dotenv/config");
const mysqlConnection = mysql.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOSTNAME,
    dialect: "mariadb",
    dialectOptions: {
      collate: "utf8mb4_general_ci",
      useUTC: false,
      timezone: "Etc/GMT0"
    },
    timezone: process.env.db_timezone,
    port: process.env.db_port,
    pool: {
      min: 0,
      max: 2,
      idle: 10000
    },
    define: {
      timestamps: false
    },
    benchmark: false,
    logging: false
  }
);

mysqlConnection.connect(function(err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log("db connect");
  }
});

module.exports = mysqlConnection;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
module.exports = sequelize;
