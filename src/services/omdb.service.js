//libreria peticiones HTTP -> llama API OMDB
const axios = require("axios");

const OMDB_URL = "https://www.omdbapi.com/";

// Buscar películas por título
const searchMovies = async (title) => {
  try {
    const response = await axios.get(OMDB_URL, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: title,
        type: "movie",
      },
    });

    if (response.data.Response === "False") {
      return [];
    }

    return response.data.Search;
  } catch (error) {
    console.error("Error buscando películas en OMDB");
    return [];
  }
};
// Obtener detalle de película por ID de OMDB
const getMovieById = async (imdbID) => {
  try {
    const response = await axios.get(OMDB_URL, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        i: imdbID,
        //sinopsis completa
        plot: "full",
      },
    });

    if (response.data.Response === "False") {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Error obteniendo película de OMDB");
    return null;
  }
};

module.exports = {
  searchMovies,
  getMovieById,
};
