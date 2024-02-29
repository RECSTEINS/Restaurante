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
    const { id, tipo, fecha, hora, monto, idProducto, usuarioReserva, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO movimientos (IDMov, TipoMov, FecMov, HoraMov, Cantidad, IdProducto, UsuarioRes) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [id, tipo, fecha, hora, monto, idProducto, usuarioReserva],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Movimiento añadido correctamente": results.affectedRows });
            }
        );
    } else if (action === "update") {
        connection.query(
            "UPDATE movimientos SET IDMov = ?, TipoMov = ?, FecMov = ?, HoraMov = ?, Cantidad = ?, IdProducto = ?, UsuarioRes = ? WHERE IdMovimiento = ?",
            [id, tipo, fecha, hora, monto, idProducto, usuarioReserva, id],
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
    connection.query("DELETE FROM movimientos WHERE IDMov = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
};
app.route("/movimientos/:id").delete(delMovimientos);


module.exports=app;