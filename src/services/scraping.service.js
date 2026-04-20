const puppeteer = require("puppeteer");

const getMovieReviews = async (movieTitle) => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    
  } catch (error) {
    await browser.close();
    console.error("Error en scraping:", error);
    return [];
  }
}
module.exports = { getMovieReviews };
