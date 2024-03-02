const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");

//Read
const getReservaciones= (request, response) => {
    connection.query("SELECT * FROM reservaciones",(error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};
app.route("/reservaciones").get(getReservaciones);

//Create, Update
const postReservaciones = (request, response) => {
    const { id, nombre, fecha, numper, nummesa, observaciones, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO reservaciones (Reservaciones_Nombre, Reservaciones_Fecha, Reservaciones_NumPersonas, Reservaciones_NoMesa, Reservaciones_Observaciones) VALUES (?, ?, ?, ?, ?)",
            [nombre, fecha, numper, nummesa, observaciones],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Reservacion añadida correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE reservaciones SET Reservaciones_Nombre = ?, Reservaciones_Fecha = ?, Reservaciones_NumPersonas = ?, Reservaciones_NoMesa = ?, Reservaciones_Observaciones  WHERE Reservaciones_Id = ?",
            [nombre, fecha, numper, nummesa, observaciones, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Reserva actualizada correctamente": results.affectedRows });
            }
        );
    }
};
app.route("/reservaciones").post(postReservaciones);

//Delete
const delReservaciones = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM reservaciones WHERE Reservaciones_Id = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Reserva eliminada":results.affectedRows});
    });
};
app.route("/reservaciones/:id").delete(delReservaciones);

module.exports=app;