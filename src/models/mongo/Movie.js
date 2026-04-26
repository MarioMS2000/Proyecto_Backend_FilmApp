// Importamos mongoose, que es la librería que nos permite modelar datos
// y trabajar con MongoDB de forma estructurada (ODM).
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  imdbID: {
    type: String,
    unique: true,
    sparse: true,
  },
  title: {
    type: String,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  genre: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: String,
  },

  poster: {
    type: String,
    required: true,
  },

  actors: [String],

  plot: String,

  imdbRating: String,

  // source, de dónde viene la película
  source: {
    type: String,
    enum: ["omdb", "mongo"],
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
