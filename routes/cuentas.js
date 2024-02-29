const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");

const getCuentas = (request, response) => {
    connection.query("SELECT * FROM cuentas",(error,results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
app.route("/cuentas").get(getCuentas);

//Create, Update
const postCuentas = (request, response) => {
    const { id, idReserva, subtotal, iva, tip, total, fechaEmision, horaEmision, estado, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO cuentas (IdCheck, IdReserva, Subtotal, IVA, Tip, Total, FechaEmision, HoraEmision, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [id, idReserva, subtotal, iva, tip, total, fechaEmision, horaEmision, estado],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Cuenta añadida correctamente": results.affectedRows });
            }
        );
    } else if (action === "update") {
        connection.query(
            "UPDATE cuentas SET IdCheck = ?, IdReserva = ?, Subtotal = ?, IVA = ?, Tip = ?, Total = ?, FechaEmision = ?, HoraEmision = ?, Estado = ? WHERE IdCheck = ?",
            [id, idReserva, subtotal, iva, tip, total, fechaEmision, horaEmision, estado, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Cuenta actualizada correctamente": results.affectedRows });
            }
        );
    }
};
app.route("/cuentas").post(postCuentas);

//Delete
const delCuentas = (request, response)=>{
    const IdCheck = request.params.IdCheck;
    connection.query("DELETE FROM cuentas WHERE IdCheck = ?",[IdCheck],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Cuenta eliminada":results.affectedRows});
    });
};
app.route("/cuentas/:IdCheck").delete(delCuentas);

module.exports=app;