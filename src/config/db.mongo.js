const mongoose = require("mongoose");

const connectMongo = async () => {
  const mongoURI = process.env.MONGO_URI;
  try {
    if (!mongoURI) throw new Error("Configuración de base de datos inválida");
    await mongoose.connect(mongoURI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error al conectar con MongoDB");
    process.exit(1);
  }
}

module.exports = {
  connectMongo,
};
