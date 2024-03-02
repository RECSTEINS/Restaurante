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
    const { id, idReserva, subtotal, iva, tip, total, fecha, estado, action } = request.body;
    if (action === "insert") {
        connection.query(
            "INSERT INTO cuentas (Cuentas_ReservaId, Cuentas_SubTotal, Cuentas_IVA, Cuentas_Tip, Cuentas_Total, Cuentas_Fecha, Cuentas_Estado) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [idReserva, subtotal, iva, tip, total, fecha, estado],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Cuenta añadida correctamente": results.affectedRows });
            }
        );
    } else if (action === "update") {
        connection.query(
            "UPDATE cuentas SET Cuentas_ReservaId = ?, Cuentas_SubTotal = ?, Cuentas_IVA = ?, Cuentas_Tip = ?, Cuentas_Total = ?, Cuentas_Fecha = ?, Cuentas_Estado = ? WHERE Cuentas_Id = ?",
            [idReserva, subtotal, iva, tip, total, fecha, estado, id],
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
    const id = request.params.IdCheck;
    connection.query("DELETE FROM cuentas WHERE Cuentas_Id = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Cuenta eliminada":results.affectedRows});
    });
};
app.route("/cuentas/:IdCheck").delete(delCuentas);

module.exports=app;