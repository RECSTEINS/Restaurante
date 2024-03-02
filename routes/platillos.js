const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");

//Read
const getPlatillos= (request, response) => {
    connection.query("SELECT * FROM platillos",(error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};
app.route("/platillos").get(getPlatillos);

//Create, Update
const postPlatillos = (request, response) => {
    const { id, nombre, tipo, descripcion, precio, action } = request.body;
    if (action === "insert") {
        connection.query(
            "INSERT INTO platillos (Platillos_Nombre, Platillos_Tipo, Platillos_Descripcion, Platillos_Precio) VALUES (?, ?, ?, ?)",
            [nombre, tipo, descripcion, precio],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Platillo añadido correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE platillos SET Platillos_Nombre = ?, Platillos_Tipo = ?, Platillos_Descripcion = ?, Platillos_Precio = ?  WHERE Platillos_Id = ?",
            [nombre, tipo, descripcion, precio, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Platillo actualizado correctamente": results.affectedRows });
            }
        );
    }
};
app.route("/platillos").post(postPlatillos);

//Delete
const delPlatillos = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM platillos WHERE Platillos_Id = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Platillo eliminado":results.affectedRows});
    });
};
app.route("/platillos/:id").delete(delPlatillos);

module.exports=app;