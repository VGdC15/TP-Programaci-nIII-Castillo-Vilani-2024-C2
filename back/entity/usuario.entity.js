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
            allowNull: false,
            unique: true,
        },
        iv: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordEncriptada: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
);

module.exports = Usuario;
