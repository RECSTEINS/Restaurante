const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");

// Obtener movimientos
const getMovimientos = (request, response) => {
    connection.query("SELECT * FROM movimientos", (error, results) => {
        if (error)
            throw error;
        response.status(200).json(results);
    });
};
app.route("/movimientos").get(getMovimientos);

// Crear y actualizar movimientos
const postMovimientos = (request, response) => {
    const { id, descripcion, monto, tipo, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO movimientos (IdMovimiento, Descripcion, Monto, Tipo) VALUES (?, ?, ?, ?)",
            [id, descripcion, monto, tipo],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Movimiento añadido correctamente": results.affectedRows });
            }
        );
    } else if (action === "update") {
        connection.query(
            "UPDATE movimientos SET Descripcion = ?, Monto = ?, Tipo = ? WHERE IdMovimiento = ?",
            [descripcion, monto, tipo, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(200).json({ "Movimiento actualizado correctamente": results.affectedRows });
            }
        );
    } else {
        response.status(400).json({ message: "Acción no válida" });
    }
};
app.route("/movimientos").post(postMovimientos);

//Delete
const delMovimientos = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM movimientos WHERE IDMovimiento = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
};
app.route("/movimientos/:id").delete(delMovimientos);


module.exports=app;