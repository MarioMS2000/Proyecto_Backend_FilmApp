const omdbService = {
  search(title) {
    return { title, results: [] };
  },
};

module.exports = omdbService;
