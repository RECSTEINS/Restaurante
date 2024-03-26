const { connection } = require("../config/config.db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const register = (req, res) => {
    const q = "SELECT * FROM usuarios WHERE Usuario_Username = ?";

    connection.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("Este correo ya ha sido registrado.");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const insertQuery = "INSERT INTO usuarios (Usuario_Username, Usuario_Nombre, Usuario_Correo, Usuario_Password) VALUES (?, ?, ?, ?)";
        const values = [
            req.body.username,
            req.body.name,
            req.body.correo,
            hashedPassword
        ];
        connection.query(insertQuery, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Usuario creado.");
        });
    });
}

const login = (req, res) => {
    const q = "SELECT * FROM usuarios WHERE Usuario_Username = ?";
    connection.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("El usuario no ha sido encontrado.");

        const checkPassword = bcrypt.compareSync(
            req.body.password,
            data[0].Usuario_Password
        );

        if (!checkPassword) return res.status(400).json("Contraseña o correo electrónico incorrecto.");
        
        const token = jwt.sign({ id: data[0].id }, "secretKey");

        const { Usuario_Password, ...others } = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
    });
};

const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("Has cerrado sesión.");
};

const getUsers = (req, res) => {
    const q = "SELECT * FROM usuarios";

    connection.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

module.exports = { register, login, logout, getUsers };
