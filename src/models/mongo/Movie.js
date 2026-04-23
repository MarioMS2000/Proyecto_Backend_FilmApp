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

  source: {
    type: String,
    enum: ["omdb", "mongo"],
    required: true,
  },
});

const Movie = mongoose.model("Movie",movieSchema);
module.exports = Movie;


const movie = new Movie({
  title: "Inception",
  year: "2010",
  genre: "Science Fiction",
  director: "Christopher Nolan",
  duration: "148 min",
  poster: "https://example.com/inception.jpg",
  actors: ["Leonardo DiCaprio", "Marion Cotillard"],
  plot: "A skilled thief who steals corporate secrets through dream-sharing technology.",
  imdbRating: "8.8",
  source: "mongo"
});
