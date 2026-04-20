const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "movie_app",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
  }
);

async function connectSql() {
  await sequelize.authenticate();

  if (process.env.DB_SYNC === "true") {
    await sequelize.sync();
  }

  return sequelize;
}

module.exports = sequelize;
module.exports.connectSql = connectSql;
