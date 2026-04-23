const mockMovieModel = {
  find: jest.fn(),
  findOne: jest.fn(),
};

const mockOmdbSearchMovies = jest.fn();
const mockOmdbGetMovieById = jest.fn();

jest.mock("../src/models/mongo/Movie", () => mockMovieModel);
jest.mock("../src/services/omdb.service", () => ({
    searchMovies: mockOmdbSearchMovies,
    getMovieById: mockOmdbGetMovieById
}));

//import service
const {searchMovie,getMovieByIdService,getRandomMovies} = require("../src/services/movie.service");

beforeEach(() => {
  jest.clearAllMocks();
});

//search movie busca API MOVIE
test("searchMovie devuelve resultados de OMDB si existen", async() => {
    const omdbData = [{ title: "Batman"}];
    mockOmdbSearchMovies.mockResolvedValue(omdbData);

    const result = await searchMovie("batman");

    expect(mockOmdbSearchMovies).toHaveBeenCalledWith("batman");
    expect(result).toEqual(omdbData);
});

//search movie, busca en MONGO
test("searchMovie busca en Mongo si OMDB no tiene resultados", async() => {
    mockOmdbSearchMovies.mockResolvedValue([]);
    mockMovieModel.find.mockResolvedValue([{ title: "batman DB" }]);

    const result = await searchMovie("batman");

    expect(mockMovieModel.find).toHaveBeenCalled();
    expect(result).toEqual([{ title: "batman DB" }]);
});


test("searchMovie devuelve [] si no hay resultados", async() => {
    mockOmdbSearchMovies.mockResolvedValue([]);
    mockMovieModel.find.mockResolvedValue([]);

    const result = await searchMovie("xxxx");

    expect(result).toEqual([]);
});

//busca por ID en API OMDB
test("getMovieByIdService devuelve OMDB si existe", async() => {
    mockOmdbGetMovieById.mockResolvedValue({ title: "Batman" });

    const result = await getMovieByIdService("123");

    expect(result).toEqual({ title: "Batman" });
});

//busca por ID en MONGO si no hay en la API
test("getMovieByIdService busca en Mongo si OMDB no tiene", async() => {
    mockOmdbGetMovieById.mockResolvedValue(null);
    mockMovieModel.findOne.mockResolvedValue({ title: "Mongo Movie" });

    const result = await getMovieByIdService("123");

    expect(mockMovieModel.findOne).toHaveBeenCalledWith({imdbID: "123"});
    expect(result).toEqual({ title: "Mongo Movie" });
});

//si no hay en OMDB y en MONGO devuelve null
test("getMovieByIdService devuelve null si no existe", async() => {
     mockOmdbGetMovieById.mockResolvedValue(null);
     mockMovieModel.findOne.mockResolvedValue(null);

     const result = await getMovieByIdService("123");

     expect(result).toBeNull();
});

test("getRandomMovies devuelve películas detalladas", async() => {
    mockOmdbSearchMovies.mockResolvedValue([{imdbID: "1"}]);
    mockOmdbGetMovieById.mockResolvedValue({ title: "Batman" });

    const result = await getRandomMovies();

    expect(mockOmdbSearchMovies).toHaveBeenCalled();
    expect(mockOmdbGetMovieById).toHaveBeenCalled();

    //comprueba que el array tenga más de 0 elementos
    expect(result.length).toBeGreaterThan(0);
});


