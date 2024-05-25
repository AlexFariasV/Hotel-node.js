const express = require("express");
const app = express();
const port = 3000; // Altere a porta para 3000 ou outra porta disponível
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override');


const dotenv = require('dotenv');
dotenv.config();

app.use(express.static("app/public"));


/* const env = require("dotenv").config(); */

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: true
}))
app.use(flash())

var rotas = require("./app/routes/router");
app.use("/", rotas);


app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port} \nhttp://localhost:${port}`);
});
