const Movie = require("../models/mongo/Movie");
const { searchMovies, getMovieById } = require("./omdb.service");

const POPULAR_TITLES = [
  "Batman",
  "Inception",
  "Matrix",
  "Interstellar",
  "Avengers",
  "Titanic",
  "Gladiator",
  "Joker",
  "Parasite",
  "The Godfather",
  "Pulp Fiction",
  "Fight Club",
  "Forrest Gump",
  "The Dark Knight",
  "Schindler's List",
  "Goodfellas",
  "The Silence of the Lambs",
  "Saving Private Ryan",
  "Braveheart",
  "Alien",
  "Terminator",
  "Jurassic Park",
  "Indiana Jones",
  "Back to the Future",
  "Rocky",
  "Scarface",
  "The Wolf of Wall Street",
  "Django",
  "La La Land",
  "Whiplash",
  "Spotlight",
  "The Revenant",
  "Mad Max",
  "John Wick",
  "Leon",
  "Heat",
  "Se7en",
  "The Shawshank Redemption",
  "American History X",
  "A Beautiful Mind",
  "Cast Away",
  "The Truman Show",
  "Memento",
  "Shutter Island",
  "Gone Girl",
  "No Country for Old Men",
  "There Will Be Blood",
  "Blade Runner",
  "2001 A Space Odyssey",
];

const searchMovie = async (title) => {
  //Buscar en OMDB
  const omdbResult = await searchMovies(title);

  if (omdbResult && omdbResult.length > 0) {
    return omdbResult;
  }

  //Buscar en Mongo
  const mongoResult = await Movie.find({
    //RegExp permite busqueda , "i" ignora mayúsculas/minúsculas
    title: new RegExp(title, "i"),
  });
  if (mongoResult && mongoResult.length > 0) {
    return mongoResult;
  }
  //si no encuentra ningun resultado
  return[];
};

//obtener detalles de la película
const getMovieByIdService = async(imdbID) => {
  const omdbMovie = await getMovieById(imdbID);

  if (omdbMovie) {
    return omdbMovie;
  }

  const mongoMovie = await Movie.findOne({
    imdbID: imdbID,
  });

  if (mongoMovie) {
    return mongoMovie;
  }
  // si no existe en ningún lugar
  return null;
}

const getRandomMovies = async () => {
  const shuffled = POPULAR_TITLES.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 10);

  // Primera búsqueda por título en OMDB
  const promises = selected.map((title) => searchMovies(title));
  const results = await Promise.all(promises);

  // Coge el primer resultado de cada búsqueda
  const firstResults = results.map((result) => result[0]).filter(Boolean);

  // Busca detalle completo de cada una con getMovieById
  const detailedPromises = firstResults.map((movie) => getMovieById(movie.imdbID));
  const detailed = await Promise.all(detailedPromises);
  return detailed.filter(Boolean);
};
module.exports = {
  searchMovie,
  getMovieByIdService,
  getRandomMovies,
};