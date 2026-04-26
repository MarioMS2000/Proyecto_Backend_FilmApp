const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.sql");

const Favorite = sequelize.define(
    "Favorite",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
            references: { // creamos clave foránea user_id apunta a users.id
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE", // CASCADE DELETE → si borras usuario → se borran sus favoritos
            onUpdate: "CASCADE", // CASCADE UPDATE → si cambia id (raro), se actualiza
        },
        //De dónde viene la peli
        sourceType: {
            type: DataTypes.ENUM("OMDB", "MONGO"), // Solo permite 2 valores o OMDB o MONGO
            allowNull: false,
            field: "source_type", // En la base de datos se guarda como source_type
        },
        // ID de la peli -> Guarda el ID de la película en su origen
        sourceMovieId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "source_movie_id", // Nombre en la base de datos
        },
    },
    {
        tableName: "favorites", // Nombre real de la tabla en SQL
        timestamps: true,
        underscored: true, // Convierte nombres automáticos a snake_case: createdAt → created_at | updatedAt → updated_at
        // Esto evita duplicados -> Un usuario NO puede guardar la misma película dos veces
        indexes: [
            {
                unique: true,
                fields: ["user_id", "source_type", "source_movie_id"],
            },
        ],
    }
);

module.exports = Favorite;
