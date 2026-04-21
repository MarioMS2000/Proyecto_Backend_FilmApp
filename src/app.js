const path = require("path");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const webRoutes = require("./routes/web.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const movieRoutes = require("./routes/movie.routes");
const favoritesRoutes = require("./routes/favorites.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const cookieParser = require('cookie-parser')

// const mongo = require("./config/db.mongo");
// mongo.connectMongo();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser())


app.use("/", webRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);
app.use("/favorites", favoritesRoutes);
app.use(errorMiddleware);


app.use((req, res) => {
  res.status(404).json({ msg: "Ruta no encontrada" });
});

module.exports = app;
