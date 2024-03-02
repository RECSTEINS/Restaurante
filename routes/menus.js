const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");

//Read
const getMenus= (request, response) => {
    connection.query("SELECT * FROM menus",(error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};
app.route("/menus").get(getMenus);

//Create, Update
const postMenus = (request, response) => {
    const { id, nombre, descripcion, idPlato, action } = request.body;
    if (action === "insert") {
        connection.query(
            "INSERT INTO menus (Menus_Nombre, Menus_Descripcion, Menus_PlatilloId) VALUES (?, ?, ?)",
            [nombre, descripcion, idPlato],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Menu añadido correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE menus SET Menus_Nombre = ?, Menus_Descripcion = ?, Menus_PlatilloId = ? WHERE Menus_Id = ?",
            [nombre, descripcion, idPlato, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Menu actualizado correctamente": results.affectedRows });
            }
        );
    }
};
app.route("/menus").post(postMenus);

//Delete
const delMenus = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM menus WHERE Menus_Id = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Menu eliminado":results.affectedRows});
    });
};
app.route("/menus/:id").delete(delMenus);

module.exports=app;