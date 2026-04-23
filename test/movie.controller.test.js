const mockSearchMovie = jest.fn();
const mockGetMovieReviews = jest.fn();
const mockGetRandomMovies = jest.fn();

const mockMovieModel = {
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
};

jest.mock("../src/services/movie.service", () => ({
  searchMovie: mockSearchMovie,
  getRandomMovies: mockGetRandomMovies,
}));

jest.mock("../src/services/scraping.service", () => ({
  getMovieReviews: mockGetMovieReviews,
}));

jest.mock("../src/models/mongo/Movie", () => mockMovieModel);

const {searchMovies,getMovieByTitle,getAllMovies,createMovie,updateMovie,deleteMovie,getRandomMoviesController} = require("../src/controllers/movie.controller");

// Permite probar res.status(...).json(...)
const fakeRes = () => {
    const res = {};
    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);
    return res;
}

//limpia las llamadas anteriores antes de cada test
beforeEach(() => {
    jest.clearAllMocks();
})

// test searchMovies 
test("devuelve 400 si no hay title", async () =>{
    const req = {query: {}};
    const res = fakeRes();
    
    await searchMovies(req,res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
        message: "El título es requerido"
    });
});

test("devuelve películas formateadas correctamente", async() => {
    const moviesMock = [
        {
            Title: "Batman",
            Poster: "img.jpg",
            Year: "2008",
        }
    ]
    mockSearchMovie.mockResolvedValue(moviesMock);

    const req = {query: {title: "batman"}};
    const res = fakeRes();

    await searchMovies(req, res);

    expect(mockSearchMovie).toHaveBeenCalledWith("batman");

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
        expect.objectContaining({
            title: "Batman",
            poster: "img.jpg",
            year: "2008",
        }),
    ]);
} );

//test getMovieByTitle
test("devuelve 404 si no encuentra película", async () =>{
    mockSearchMovie.mockResolvedValue([]);

    const req = {params: {title: "xxx"}};
    const res = fakeRes();

    await getMovieByTitle(req,res);

    expect(mockSearchMovie).toHaveBeenCalledWith("xxx");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
        message: "Película no encontrada",
    });
});

test("devuelve película con reviews", async () => {
    const movieMock = [
    {
      Title: "Batman",
      imdbRating: "8.5",
    },
  ];

  const reviewsMock = ["Muy buena"];

  mockSearchMovie.mockResolvedValue(movieMock);
  mockGetMovieReviews.mockResolvedValue(reviewsMock);

  const req = { params: { title: "batman" } };
  const res = fakeRes();

  await getMovieByTitle(req, res);

  // valida llamadas
  expect(mockSearchMovie).toHaveBeenCalledWith("batman");
  expect(mockGetMovieReviews).toHaveBeenCalledWith("Batman");

  // valida respuesta
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      title: "Batman",
      rating: "8.5",
      reviews: reviewsMock,
    })
  );
});

// get movies
test("devuelve todas las películas", async () => {
    const movies = [{title: "Batman"}];

    mockMovieModel.find.mockResolvedValue(movies);

    const req = {};
    const res = fakeRes();

    await getAllMovies(req, res);

    expect(mockMovieModel.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(movies);
});

//createMovies
test("crea una película correctamente", async () => {
    const movie = {title: "Batman"};
    mockMovieModel.create.mockResolvedValue(movie);

    const req = { body: movie};
    const res = fakeRes();

    await createMovie(req, res);

    expect(mockMovieModel.create).toHaveBeenCalledWith(movie);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(movie);

});

//updateMovie
test("devuelve 404 si no existe la película", async () => {
    mockMovieModel.findByIdAndUpdate.mockResolvedValue(null);

    const req = {
        params: { id: "123" },
        body: { title: "Nuevo" },
    }
    const res = fakeRes();

    await updateMovie(req,res);

    expect(res.status).toHaveBeenCalledWith(404);
});

test("actualiza correctamente una película", async () => {
    const updatedMovie = { title: "Nuevo"};

    mockMovieModel.findByIdAndUpdate.mockResolvedValue(updatedMovie);

    const req = {
        params: {id: "123"},
        body: {title: "Nuevo"},
    }
    const res = fakeRes();

    await updateMovie(req,res);

    expect(mockMovieModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "123",
        {title: "Nuevo"},
        {new: true}
    );
    expect(mockMovieModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedMovie);
});

//deleteMovie
test("devuelve 404 si no existe la película", async ()=> {
    mockMovieModel.findByIdAndDelete.mockResolvedValue(null);

    const req = {params: {id: "123"}};
    const res = fakeRes();

    await deleteMovie(req,res);

    expect(res.status).toHaveBeenCalledWith(404);
});

test("elimina correctamente una película", async ()=> {
    mockMovieModel.findByIdAndDelete.mockResolvedValue({});

    const req = {params: {id: "123"}};
    const res = fakeRes();

    await deleteMovie(req, res);

    expect(mockMovieModel.findByIdAndDelete).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({message: "Película eliminada",});
});

test("devuelve películas aleatorias formateadas", async () => {
    mockGetRandomMovies.mockResolvedValue([
      {
        title: "Batman",
        poster: "img.jpg",
        year: "2008",
      },
    ]);

    const req = {};
    const res = fakeRes();

    await getRandomMoviesController(req,res);

    expect(mockGetRandomMovies).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
        expect.objectContaining({
            title: "Batman",
            poster: "img.jpg",
            year: "2008",
        }),
    ]);
});