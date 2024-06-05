var express = require("express");
var router = express.Router();
var TarefasControl = require("../controllers/control")

const { body, validationResult } = require("express-validator");
const { notifyMessages } = require('../util/funcao')


router.get("/", function (req, res) {
    res.render("pages/home");
});

/* ====================================Login=================================================== */

router.get("/login", function (req, res) {
    res.render("pages/login", {pagina:"login", logado:null});
});

/* =====================================Cadastro================================================= */
router.get("/cadastro", function (req, res) {
    res.render("pages/cadastro", {pagina:"cadastro", logado:null, retorno: null, listaErros: null, dados: null
      });
});
router.post("/cadastro", TarefasControl.regrasValidacao,  async function (req, res) {
    TarefasControl.Criarussuario(req,res)
});
/* ============================================================================================= */


router.get("/quartos", function (req, res) {
    res.render("pages/client/quartos");
});
router.get("/perfil", function (req, res) {
    res.render("pages/client/perfil");
});


router.get("/config", function (req, res) {
    res.render("pages/client/config");
})


module.exports = router;
