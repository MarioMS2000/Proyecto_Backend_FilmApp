const Movie = require("../models/mongo/Movie");
const { searchMovies, getMovieById } = require("./omdb.service");
const img = "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80";

//array de string para generar películas aleatorias
const titles_movies = [
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

const normalizeMovie = (movie) => {
  if (!movie) return null;

  return {
    imdbID: movie.imdbID || movie.imdbID || null,

    title: movie.Title && movie.Title !== "N/A" ? movie.Title : movie.title || "Sin título",
    year: movie.Year && movie.Year !== "N/A" ? movie.Year : movie.year || "Sin año",
    genre: movie.Genre && movie.Genre !== "N/A" ? movie.Genre : movie.genre || "Sin género",
    director: movie.Director && movie.Director !== "N/A" ? movie.Director : movie.director || "Sin director",
    duration: movie.Runtime && movie.Runtime !== "N/A" ? movie.Runtime : movie.duration || "No disponible",
    poster: movie.Poster && movie.Poster !== "N/A"  ? movie.Poster  : movie.poster || img,
    actors: movie.Actors && movie.Actors !== "N/A"  ? movie.Actors.split(", ") : movie.actors || [],
    plot:  movie.Plot && movie.Plot !== "N/A"  ? movie.Plot : movie.plot || "Sin información disponible",
    imdbRating: movie.imdbRating && movie.imdbRating !== "N/A"  ? movie.imdbRating : movie.imdbRating || "N/A",
    source: movie.source || "omdb",
  };
};

const searchMovie = async (title) => {
  //Buscar en OMDB
  const omdbResult = await searchMovies(title);

  if (omdbResult && omdbResult.length > 0) {
    const detailedMovies = await Promise.all(
      omdbResult.slice(0, 5).map(async (movie) => {
        const full = await getMovieById(movie.imdbID);
        return normalizeMovie(full);
      }),
    );
    return detailedMovies.filter(Boolean);
  }

  //Buscar en Mongo
  const mongoResult = await Movie.find({
    //RegExp permite busqueda por título, "i" ignore case, ignora mayúsculas/minúsculas
    title: new RegExp(title, "i"),
  });
  if (mongoResult && mongoResult.length > 0) {
    return mongoResult.map(normalizeMovie);
  }
  //si no encuentra ningun resultado
  return[];
};

//obtener detalles de la película
const getMovieByIdService = async(imdbID) => {
  const omdbMovie = await getMovieById(imdbID);

  if (omdbMovie) {
    return omdbMovie;
  };

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
  //Mezcla la lista de títulos y elige 10 peliculas aleatorias
  const randomTitle = titles_movies.sort(() => 0.5 - Math.random());
  const selected = randomTitle.slice(0, 10);

  // Primero buscar en OMDb
  const promises = selected.map((title) => searchMovies(title));
  const results = await Promise.all(promises);

  // Filtra los resultados válidos y elimina valores vacíos o undefined
  const firstResults = results.map((result) => result[0]).filter(Boolean);

  // Busca detalle completo + normalizar
  const detailedPromises = firstResults.map((movie) =>
    getMovieById(movie.imdbID),
  );

  const detailed = await Promise.all(detailedPromises);
  return detailed.filter(Boolean);
};

module.exports = {
  searchMovie,
  getMovieByIdService,
  getRandomMovies,
};