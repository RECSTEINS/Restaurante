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

//Create, Update
const postProveedores = (request, response) => {
    const { id, nombre, activo, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO proveedores (Proveedor_Nombre, Proveedor_Activo) VALUES (?, ?)",
            [nombre, activo],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Proveedor añadido correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE proveedores SET Proveedor_Nombre = ?, Proveedor_Activo = ?  WHERE Proveedor_Id = ?",
            [nombre, activo, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({"Proveedor actualizado correctamente": results.affectedRows });
            }
        );
    }
};
app.route("/proveedores").post(postProveedores);

//Delete
const delProveedores = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM proveedores WHERE Proveedor_Id = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Proveedor eliminado":results.affectedRows});
    });
};
app.route("/proveedores/:id").delete(delProveedores);

module.exports=app;