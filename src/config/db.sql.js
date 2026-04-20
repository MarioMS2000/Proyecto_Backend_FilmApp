const { Sequelize } = require("sequelize");

  function connectSql() {
    return new Sequelize(
      process.env.DB_NAME || "movie_app",
      process.env.DB_USER || "postgres",
      process.env.DB_PASSWORD || "",
      {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: false,
      }
    );
  }

module.exports = {connectSql}
