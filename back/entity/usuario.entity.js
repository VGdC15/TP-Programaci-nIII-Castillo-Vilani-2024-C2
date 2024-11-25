const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");


const Usuario = sequelize.define(
    "Usuario", 
    {
        idusuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            },
        email: {
            type: DataTypes.STRING,
            allowNull: false, // NOT NULL
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, // NOT NULL
        },
    }
);

module.exports = Usuario;
