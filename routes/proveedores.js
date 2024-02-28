const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");

//Read
const getProveedores= (request, response) => {
    connection.query("SELECT * FROM proveedores",(error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};
app.route("/proveedores").get(getProveedores);

//Nota: *Revisar update*
//Create, Update
const postProveedores = (request, response) => {
    const { id, nombre, activo, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO proveedores (IdProveedor, NomProv, Activo) VALUES (?, ?, ?)",
            [id, nombre, activo],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Item añadido correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE proveedores SET IdProveedor = ?, NomProv = ?, Activo = ?  WHERE IdProveedor = ?",
            [id, nombre, activo, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Item actualizado correctamente": results.affectedRows });
            }
        );
    }
};
app.route("/proveedores").post(postProveedores);

//Delete
const delProveedores = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM proveedores WHERE IdProveedor = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
};
app.route("/proveedores/:id").delete(delProveedores);

module.exports=app;