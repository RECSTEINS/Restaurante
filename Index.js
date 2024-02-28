require('dotenv').config();
const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes/proveedores'));
app.use(require('./routes/productos'));
app.use(require('./routes/movimientos'));
app.use(require('./routes/cuentas'));
app.use(require('./routes/reservaciones'));

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log("El servidor esta en el puerto " + PORT);
});
module.exports = app;