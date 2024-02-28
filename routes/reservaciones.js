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

//Nota: Revisar update
//Create, Update
const postReservaciones = (request, response) => {
    const { id, nombre, fecha, hr, nump, nummesa, observaciones, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO reservaciones (IdReserva, NomCliente, FecResrv, HoraResrv, NumPersonas, No_Mesa, Observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [id, nombre, fecha, hr, nump, nummesa, observaciones],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Reservacion añadida correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE reservaciones SET IdReserva = ?, NomCliente = ?, FecResrv= ?, HoraResrv= ?, NumPersonas= ?, No_Mesa= ?, Observaciones= ?  WHERE IdReserva = ?",
            [id, nombre, fecha, hr, nump, nummesa, observaciones, id],
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
    connection.query("DELETE FROM reservaciones WHERE IdReserva = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Reserva eliminada":results.affectedRows});
    });
};
app.route("/reservaciones/:id").delete(delReservaciones);

module.exports=app;