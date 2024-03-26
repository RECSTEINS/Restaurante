const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");

//Read
const getProductos= (request, response) => {
    connection.query("SELECT pr.Productos_Id, pr.Productos_Nombre, pr.Productos_Descripcion, pr.Productos_Tipo, pr.Productos_Precio, p.Proveedor_Id, p.Proveedor_Nombre, p.Proveedor_Activo FROM productos pr LEFT JOIN proveedores p ON pr.Productos_ProveedorID = p.Proveedor_Id;",(error,results)=>{
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
            "INSERT INTO productos (Productos_Nombre, Productos_Descripcion, Productos_Tipo, Productos_Precio, Productos_ProveedorID) VALUES (?, ?, ?, ?, ?)",
            [nombre, descripcion, tipo, precio, idProveedor],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Producto añadido correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE productos SET Productos_Nombre = ?, Productos_Descripcion = ?, Productos_Tipo = ?, Productos_Precio = ?, Productos_ProveedorID = ? WHERE Productos_Id = ?",
            [nombre, descripcion, tipo, precio, idProveedor, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Producto actualizado correctamente": results.affectedRows });
            }
        );
    }
};
app.route("/producto").post(postProducto);

//Delete
const delProductos = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM productos WHERE Productos_Id = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Producto eliminado":results.affectedRows});
    });
};
app.route("/productos/:id").delete(delProductos);

module.exports=app;