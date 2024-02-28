const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");

//Read
const getProductos= (request, response) => {
    connection.query("SELECT * FROM productos",(error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};
app.route("/productos").get(getProductos);

//Create, Update
const postProducto = (request, response) => {
    const { id, nombre, descripcion, tipo, precio, idProveedor, action } = request.body;
    if (action === "insert") {
        connection.query(
            "INSERT INTO productos (IDProducto, Nombre, Descripcion, TipoProducto, Precio, IdProveedor) VALUES (?, ?, ?, ?, ?, ?)",
            [id, nombre, descripcion, tipo, precio, idProveedor],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Item añadido correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE productos SET IDProducto = ?, Nombre = ?, Descripcion = ?, TipoProducto = ?, Precio = ?, IdProveedor = ? WHERE IDProducto = ?",
            [id, nombre, descripcion, tipo, precio, idProveedor, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Item actualizado correctamente": results.affectedRows });
            }
        );
    }
};
app.route("/producto").post(postProducto);

//Delete
const delProductos = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM productos WHERE IDProducto = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
};
app.route("/productos/:id").delete(delProductos);

module.exports=app;