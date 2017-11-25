"use strict";

let express = require("express");
let app = express();
const bodyParser = require("body-parser");
let mongoose = require("mongoose");

// conexion a mongodb
 let conn= mongoose.connect("mongodb://localhost/angular", {
  useMongoClient: true
});

// definir modelo
let lista = mongoose.model("Lista", {
  titulo: String,
  texto: String,
  fecha: Date
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
        "titulo" : "titulotres",
      "texto": "textotres",
      "fecha" : new Date()
      
    },
    (err, lista) => {
      if (err) {
        res.send(err);
      } 
    });  
});

// select de datos 
app.get("/listar", (req, res) => {
        lista.find((err, lista) => {
          if (err) {
            res.send(err);
          }
          res.json(lista)
            console.log(res.json(lista));
          
      
        });

    
});
app.listen(2222, () => {
  console.log("SERVIDOR  :2222");
});
