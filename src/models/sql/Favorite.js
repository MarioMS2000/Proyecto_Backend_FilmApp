const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.sql");

const Favorite = sequelize.define(
    "Favorite",
    {
        user_id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        movie_id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    },
    {
        tableName: "favorite",
        timestamps: false, // NO metas los campos de created and updated
    }

);

module.exports = Favorite;
