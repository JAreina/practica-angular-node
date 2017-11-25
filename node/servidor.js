"use strict";

let express = require("express");
let app = express();
const bodyParser = require("body-parser");
let mongoose = require("mongoose");
const cors = require('cors');

// conexion a mongodb
let conn = mongoose.connect("mongodb://localhost/angular", {
  useMongoClient: true
});

// definir modelo
let lista = mongoose.model("Lista", {
  titulo: String,
  texto: String,
  fecha: Date
});


//cors para que pueda ser accedido desde otro servidor
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// ruta básica estatica
app
  .use(express.static(__dirname + "/public"))

  .use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, recursos) => {
  recursos.sendFile("./public/index.html");
});

//crear colleccion e insertar datos
app.post("/crear", (req, res) => {
  lista.create(
    {
      titulo: "titulocuatro",
      texto: "textocuatro",
      fecha: new Date()
    },
    (err, lista) => {
      if (err) {
        res.send(err);
      }
    }
  );
});

// select de datos
app.get("/listar", (req, res) => {
  lista.find((err, lista) => {
    if (err) {
      res.send(err);
    }
    return res.json(lista);
    console.log(res.json(lista));
  });
});

//borrar
app.delete("/borrar/:id", (req, res) => {
  let i = req.params.id;

  console.log("ID A BORRAR : " + i);

  lista.deleteOne({ _id: i }, (err, lista) => {
    if (err) res.send(err);

    res.json(lista);
  });
});

// ACTUALIZAR CON PUT

app.put("/actualizar/:id", (req, res) => {
  let i = req.params.id;
  console.log("ID A actualizar : " + i);
  lista.findOneAndUpdate({ "_id": i },
                                          { "fecha": new Date() }, 
                                          (err, lista) => {
                                                           if (err) res.send(err);
                                                           
                                                           res.json(lista);
  });
});
app.listen(2222, () => {
  console.log("SERVIDOR  :2222");
});
