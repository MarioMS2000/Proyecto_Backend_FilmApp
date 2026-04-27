// Setup
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser")
const swaggerUi = require("swagger-ui-express")
const YAML = require('yamljs')
require("dotenv").config();

const openapiDocument = YAML.load(path.join(process.cwd(), "docs", "openapi.yaml"));

// Routes 
const webRoutes = require("./routes/web/index.routes");
const apiRoutes = require("./routes/api/index.routes");

// Middelwares/Docs
const swaggerSpec = require("./config/swagger")
const errorMiddleware = require("./middlewares/error.middleware");

const mongo = require("./config/db.mongo");
mongo.connectMongo();

const app = express();

// Views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Express/Config
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Web
app.use("/", webRoutes);

// Api
app.use("/api", apiRoutes);

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

// 404
app.use((req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ message: "Ruta API no encontrada" });
  }

  return res.status(404).send("Pagina no encontrada");
});

// Error
app.use(errorMiddleware);




module.exports = app;
