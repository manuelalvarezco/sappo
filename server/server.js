require('./config/config');

const express = require('express')
const app = express();
const mongoose = require('mongoose')

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/index')) //Configuración global de rutas


mongoose.connect('mongodb://localhost:27017/sappo', { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {

    if (err) throw err;

    console.log('Base de datos on line');
});


app.listen(process.env.PORT, () => {
    console.log('Corriendo en el puerto ', process.env.PORT);
})