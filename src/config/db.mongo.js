const mongoose = require("mongoose");

async function connectMongo(uri = process.env.MONGO_URI) {
  if (!uri) return null;
  return mongoose.connect(uri);
}

module.exports = {
  connectMongo,
};
