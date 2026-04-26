// Simula el modelo de MongoDB sin conectar a la base de datos real
const mockMovieModel = {
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
};

// Mocks de servicios externos usados por el controller para evitar llamadas reales a APIs
const mockSearchMovie = jest.fn();
const mockGetMovieReviews = jest.fn();
const mockGetRandomMovies = jest.fn();

// Sustituye los servicios reales por mocks para aislar el controller en los tests,
// evitando llamadas a APIs externas, scraping
jest.mock("../src/services/movie.service", () => ({
  searchMovie: mockSearchMovie,
  getRandomMovies: mockGetRandomMovies,
}));

jest.mock("../src/services/scraping.service", () => ({
  getMovieReviews: mockGetMovieReviews,
}));

// Sustituimos el modelo real de Mongo por nuestro mock
jest.mock("../src/models/mongo/Movie", () => mockMovieModel);

//Importamos las funciones que vamos a testear de movie controller
const {searchMovies,getMovieByTitle,getAllMovies,createMovie,updateMovie,deleteMovie,getRandomMoviesController} = require("../src/controllers/movie.controller");

// fakeRes es la respuesta de Express (res) para poder testear el controller sin servidor real,
// simulando el comportamiento de res.status().json() 
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

// test searchMovies, verifica que devuelve error 400 cuando no se envía el título en la query 
test("devuelve 400 si no hay title", async () =>{
    const req = {query: {}};
    const res = fakeRes();
    
    await searchMovies(req,res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
        message: "El título es requerido"
    });
});

// Verifica que devuelva las películas formateadas y mapea datos de la API externa
test("devuelve películas formateadas correctamente", async() => {
  //Simula lo que devolvería una API OMDb
  const moviesMock = [
    {
      Title: "Batman",
      Poster: "img.jpg",
      Year: "2008",
    },
  ];
  // Definimos lo que devolverá el servicio mockeado cuando se invoque searchMovie
  mockSearchMovie.mockResolvedValue(moviesMock);

  //simula la query string de Express req.query.tittle
  const req = { query: { title: "batman" } };

  //Mock, simula la respuesta
  const res = fakeRes();

  //Ejecuta el controller con la request y response simuladas
  await searchMovies(req, res);

  // Verifica que el controller llamó al servicio con el parámetro correcto
  expect(mockSearchMovie).toHaveBeenCalledWith("batman");

  // Verifica el código de estado HTTP devuelto por el controller
  expect(res.status).toHaveBeenCalledWith(200);
  //transformación de datos
  expect(res.json).toHaveBeenCalledWith([
    //verifica que el objeto, contenga las propiedades
    expect.objectContaining({
      title: "Batman",
      poster: "img.jpg",
      year: "2008",
    }),
  ]);
} );

//TEST getMovieByTitle
test("devuelve 404 si no encuentra película", async () =>{
  //simulamos larespuesta que dara searchMovie
  mockSearchMovie.mockResolvedValue([]);

  const req = { params: { title: "xxx" } };
  //Mock, simula la respuesta
  const res = fakeRes();

  await getMovieByTitle(req, res);

  expect(mockSearchMovie).toHaveBeenCalledWith("xxx");
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({
    message: "Película no encontrada",
  });
});

//TEST getMovieByTitle
test("devuelve película con reviews", async () => {
  // Simula la respuesta de la API externa (OMDb)
  const movieMock = [
    {
      Title: "Batman",
      imdbRating: "8.5",
    },
  ];

  // Simula las reviews obtenidas desde el servicio de scraping
  const reviewsMock = ["Muy buena"];

  // Configura el mock del servicio de búsqueda de películas
  mockSearchMovie.mockResolvedValue(movieMock);

  // de reviews
  mockGetMovieReviews.mockResolvedValue(reviewsMock);

  // Simula parámetros de la URL (req.params.title)
  const req = { params: { title: "batman" } };

  // Simula respuesta
  const res = fakeRes();

  // Ejecuta el controller
  await getMovieByTitle(req, res);

  // Verifica que se llamó al servicio de búsqueda con el título correcto
  expect(mockSearchMovie).toHaveBeenCalledWith("batman");
  // Verifica que se llamaron las reviews con el título normalizado
  expect(mockGetMovieReviews).toHaveBeenCalledWith("Batman");

  // Verifica la respuesta HTTP y la estructura final del objeto
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      title: "Batman",
      rating: "8.5",
      reviews: reviewsMock,
    }),
  );
});

//TEST getAllMovies
test("devuelve todas las películas", async () => {
  // Simula listado de películas en base de datos
  const movies = [{ title: "Batman" }];

  // Mock de MongoDB find()
  mockMovieModel.find.mockResolvedValue(movies);

  const req = {};
  const res = fakeRes();
  // Ejecuta controller
  await getAllMovies(req, res);

  // Verifica acceso a base de datos
  expect(mockMovieModel.find).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(movies);
});

//TEST createMovie
test("crea una película correctamente", async () => {
  // Datos de entrada para crear película
  const movie = { title: "Batman" };
  // Simula creación en base de datos
  mockMovieModel.create.mockResolvedValue(movie);

  const req = { body: movie };
  const res = fakeRes();

  // Ejecuta controller
  await createMovie(req, res);

  // Verifica que se llamó a create con los datos correctos
  expect(mockMovieModel.create).toHaveBeenCalledWith(movie);

  // Verifica respuesta de creación
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(movie);
});

//TEST updateMovie
test("devuelve 404 si no existe la película", async () => {
  // Simula que no se encuentra la película
  mockMovieModel.findByIdAndUpdate.mockResolvedValue(null);

  const req = {
    params: { id: "123" },
    body: { title: "Nuevo" },
  };
  const res = fakeRes();

  await updateMovie(req, res);

  // Verifica error por dato que no existe
  expect(res.status).toHaveBeenCalledWith(404);
});

//TEST updateMovie
test("actualiza correctamente una película", async () => {
  // Simula película actualizada
  const updatedMovie = { title: "Nuevo" };

  mockMovieModel.findByIdAndUpdate.mockResolvedValue(updatedMovie);

  const req = {
    params: { id: "123" },
    body: { title: "Nuevo" },
  };
  const res = fakeRes();

  await updateMovie(req, res);

  // Verifica parámetros correctos en la actualización
  expect(mockMovieModel.findByIdAndUpdate).toHaveBeenCalledWith(
    "123",
    { title: "Nuevo" },
    { new: true },
  );
  // Verifica que solo se llamó una vez
  expect(mockMovieModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
  // Verifica respuesta correcta
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(updatedMovie);
});

//TEST deleteMovie
test("devuelve 404 si no existe la película", async ()=> {
  // Simula eliminación fallida no existe el registro
  mockMovieModel.findByIdAndDelete.mockResolvedValue(null);

  const req = { params: { id: "123" } };
  const res = fakeRes();

  // Ejecuta controller
  await deleteMovie(req, res);
  // Verifica error por recurso inexistente
  expect(res.status).toHaveBeenCalledWith(404);
});

//TEST deleteMovie
test("elimina correctamente una película", async ()=> {
  // Simula eliminación exitosa
  mockMovieModel.findByIdAndDelete.mockResolvedValue({});

  const req = { params: { id: "123" } };
  const res = fakeRes();
  // Ejecuta controller
  await deleteMovie(req, res);

  // Verifica llamada al modelo con ID correcto
  expect(mockMovieModel.findByIdAndDelete).toHaveBeenCalledWith("123");
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: "Película eliminada" });
});

//TEST getRandomMoviesController
test("devuelve películas aleatorias formateadas", async () => {
  // Simula respuesta del servicio de películas aleatorias
  mockGetRandomMovies.mockResolvedValue([
    {
      title: "Batman",
      poster: "img.jpg",
      year: "2008",
    },
  ]);

  const req = {};
  const res = fakeRes();
  // Ejecuta controller
  await getRandomMoviesController(req, res);
  // Verifica que se llamó al servicio
  expect(mockGetRandomMovies).toHaveBeenCalled();
  // Verifica respuesta HTTP y formato final
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith([
    expect.objectContaining({
      title: "Batman",
      poster: "img.jpg",
      year: "2008",
    }),
  ]);
});