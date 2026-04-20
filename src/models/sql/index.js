const User = require("./User");
const Favorite = require("./Favorite");

// Relación: Usuario 1 -> N Favoritos
User.hasMany(Favorite, {
    foreignKey: "user_id",
    as: "favorites",
    onDelete: "CASCADE", // Si borras un usuario → se borran automáticamente sus favoritos
});

// Relación inversa: Favorito -> Usuario
Favorite.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
    onDelete: "CASCADE",
});

module.exports = {
    User,
    Favorite,
};