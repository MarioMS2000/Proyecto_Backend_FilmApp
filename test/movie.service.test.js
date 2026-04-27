// Mock del modelo de MongoDB, simula la base de datos
// En lugar de usar el modelo de Mongo real
const mockMovieModel = {
  find: jest.fn(),
  findOne: jest.fn(),
};

// Mocks de las funciones del servicio OMDB service
const mockOmdbSearchMovies = jest.fn();
const mockOmdbGetMovieById = jest.fn();

// Sustituimos el modelo real de Mongo por nuestro mock
jest.mock("../src/models/mongo/Movie", () => mockMovieModel);

// Sustituimos el servicio OMDB real por funciones mockeadas
jest.mock("../src/services/omdb.service", () => ({
  searchMovies: mockOmdbSearchMovies,
  getMovieById: mockOmdbGetMovieById,
}));

//Importamos las funciones que vamos a testear
const {
  searchMovie,
  getMovieByIdService,
  getRandomMovies,
} = require("../src/services/movie.service");

// Antes de cada test limpiamos los mocks para evitar interferencias entre tests
beforeEach(() => {
  jest.clearAllMocks();
});

//TEST OMDb API MOVIE busca una peli
test("searchMovie devuelve resultados de OMDB si existen", async () => {
  // Simulamos que OMDB devuelve una película
  const omdbData = [{ title: "Batman", imdbID: "1" }];
  //si llama a esa función , devuelve ese resultado
  mockOmdbSearchMovies.mockResolvedValue(omdbData);

  // Simulamos que al pedir detalles por ID devuelve info completa
  mockOmdbGetMovieById.mockResolvedValue({ title: "Batman", imdbID: "1" });

  // Ejecutamos la función a testear
  const result = await searchMovie("batman");

  // Comprueba que esta función fue llamada con este valor
  expect(mockOmdbSearchMovies).toHaveBeenCalledWith("batman");
  // Verificamos que el título de la primera película, contenga la película esperada
  expect(result[0].title).toBe("Batman");
});

//TEST de Mongo, si OMDB no devuelve resultados
test("searchMovie busca en Mongo si OMDB no tiene resultados", async () => {
  // OMDB no encuentra nada
  mockOmdbSearchMovies.mockResolvedValue([]);
  // Mongo devuelve una película
  mockMovieModel.find.mockResolvedValue([{ title: "batman DB" }]);

  const result = await searchMovie("batman");

  // Comprueba que se ha llamado a la función que busca películas en OMDB
  // comprueba que esta función se ha ejecutado al menos una vez
  expect(mockMovieModel.find).toHaveBeenCalled();
  expect(result[0].title).toBe("batman DB");
});

test("searchMovie devuelve [] si no hay resultados", async () => {
  //Simulo que la API de OMDB y la BBDD Mongo no encuentra ninguna película
  mockOmdbSearchMovies.mockResolvedValue([]);
  mockMovieModel.find.mockResolvedValue([]);

  const result = await searchMovie("xxxx");

  expect(result).toEqual([]);
});

//busca por ID en API OMDB
test("getMovieByIdService devuelve OMDB si existe", async () => {
    //Simulamos que la API me devuelve una peli x titulo
  mockOmdbGetMovieById.mockResolvedValue({ title: "Batman" });

  const result = await getMovieByIdService("123");

  expect(result).toEqual({ title: "Batman" });
});

//busca por ID en MONGO si no hay en la API
test("getMovieByIdService busca en Mongo si OMDB no tiene", async () => {
  mockOmdbGetMovieById.mockResolvedValue(null);
  mockMovieModel.findOne.mockResolvedValue({ title: "Mongo Movie" });

  const result = await getMovieByIdService("123");

  expect(mockMovieModel.findOne).toHaveBeenCalledWith({ imdbID: "123" });
  expect(result).toEqual({ title: "Mongo Movie" });
});

//si no hay en OMDB y en MONGO devuelve null
test("getMovieByIdService devuelve null si no existe", async () => {
  mockOmdbGetMovieById.mockResolvedValue(null);
  mockMovieModel.findOne.mockResolvedValue(null);

  const result = await getMovieByIdService("123");

  expect(result).toBeNull();
});

test("getRandomMovies devuelve películas detalladas", async () => {
  // Simulamos la búsqueda por título, que nos devuelve un ID
  mockOmdbSearchMovies.mockResolvedValue([{ imdbID: "1" }]);

  // con ese ID obtengo el título final
  mockOmdbGetMovieById.mockResolvedValue({ title: "Batman" });

  const result = await getRandomMovies();

  // Comprueba que estas funciones se han ejecutado al menos una vez
  expect(mockOmdbSearchMovies).toHaveBeenCalled();
  expect(mockOmdbGetMovieById).toHaveBeenCalled();

  //comprueba que el array tenga más de 0 elementos
  expect(result.length).toBeGreaterThan(0);
});
