require('dotenv').config();
const express = require("express");
const cors    = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const userRuta = require("./routes/usuarios.js");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser())



app.use(require('./routes/proveedores'));
app.use(require('./routes/productos'));
app.use(require('./routes/movimientos'));
app.use(require('./routes/cuentas'));
app.use(require('./routes/reservaciones'));
app.use(require('./routes/platillos'));
app.use(require('./routes/menus'));

app.use('/usuarios', userRuta);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log("El servidor esta en el puerto " + PORT);
});
module.exports = app;