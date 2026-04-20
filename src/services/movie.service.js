const Movie = require("../models/mongo/Movie");
const { searchMovies, getMovieById } = require("./omdb.service");

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

module.exports = {
  searchMovie,
  getMovieByIdService,
};