//una librería que permite controlar un navegador real, para hacer scraping
const puppeteer = require("puppeteer");

// Función que obtiene reviews de una película desde Metacritic mediante scraping
const getMovieReviews = async (movieTitle) => {
  // Inicia el navegador sin interfaz gráfica
  const browser = await puppeteer.launch({ headless: true });

  // Crea una nueva página o pestaña dentro del navegador
  const page = await browser.newPage();

  // Configura un User-Agent para simular un navegador real
  // Esto ayuda a evitar bloqueos por detección de bots
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  );

  // Normaliza el título de la película para construir una URL válida en Metacritic
  // En minuscula, reemplazando espacios x guiones y eliminando caracteres no validos
  const formattedTitle = movieTitle.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const url = `https://www.metacritic.com/movie/${formattedTitle}/user-reviews/`;

  try {
    // Navega a la página y espera a que cargue el HTML principal
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Espera a que aparezcan los elementos de reviews en la página
    await page.waitForSelector("div[data-testid='review-card']", {
      timeout: 5000,
    });

    // Ejecuta código directamente dentro del navegador (contexto DOM)
    const reviews = await page.evaluate(() => {
      // Selecciona todas las tarjetas de reviews del DOM
      const cards = document.querySelectorAll("div[data-testid='review-card']");

      const result = [];

      // Recorre las tarjetas encontradas
      cards.forEach((card, index) => {
        // Limitamos  el número de reviews a 5 para optimizar rendimiento
        if (index < 5) {
          // Extrae el texto 
          const review = card.querySelector(".review-card__quote")?.innerText;

          // Extrae la puntuación 
          const rating = card.querySelector(
            ".c-siteReviewScore span",
          )?.innerText;

          // Extrae el nombre del autor 
          const author = card
            .querySelector(".review-card__header")
            ?.innerText?.trim();

          // Solo guarda la review si existe contenido válido
          if (review) {
            result.push({
              author,
              rating,
              review,
            });
          }
        }
      });

      return result;
    });
    // Cierra el navegador para liberar recursos del sistema
    await browser.close();
    // Devuelve las reviews obtenidas
    return reviews;
  } catch (error) {
    // Si ocurre un error, asegura que el navegador se cierre
    await browser.close();
    console.error("Error en scraping:", error);
    return [];
  }
};

module.exports = { getMovieReviews };
