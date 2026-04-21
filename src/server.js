require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db.sql");
require("./models/sql");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexion a PostgreSQL establecida correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo conectar a PostgreSQL:", error.message);
    process.exit(1);
  }
}

startServer();
