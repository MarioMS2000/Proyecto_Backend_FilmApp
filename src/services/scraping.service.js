const puppeteer = require("puppeteer");

const getMovieReviews = async (movieTitle) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  );

  const formattedTitle = movieTitle
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const url = `https://www.metacritic.com/movie/${formattedTitle}/user-reviews/`;

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    await page.waitForSelector("div[data-testid='review-card']", {
      timeout: 5000,
    });

    const reviews = await page.evaluate(() => {
      const cards = document.querySelectorAll("div[data-testid='review-card']");

      const result = [];

      cards.forEach((card, index) => {
        if (index < 5) {
          const review = card.querySelector(".review-card__quote")?.innerText;

          const rating = card.querySelector(
            ".c-siteReviewScore span",
          )?.innerText;

          const author = card
            .querySelector(".review-card__header")
            ?.innerText?.trim();

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

    await browser.close();
    return reviews;
  } catch (error) {
    await browser.close();
    console.error("Error en scraping:", error);
    return [];
  }
};

module.exports = { getMovieReviews };
