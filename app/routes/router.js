var express = require("express");
var router = express.Router();
var TarefasControl = require("../controllers/control")

const { body, validationResult } = require("express-validator");


router.get("/", function (req, res) {
    res.render("pages/home", {pagina:"home", logado:null});
});

/* ======================================================================================= */
/* router.get("/login", function (req, res) {
    res.render("pages/template-home", {pagina:"login", logado:null});
});
router.get("/cadastro", function (req, res) {
    res.render("pages/template-home", {pagina:"cadastro", logado:null, retorno: null, listaErros: null, dados: null
      });
});
router.post("/cadastro", TarefasControl.regrasValidacao,  async function (req, res) {
    TarefasControl.Criarussuario(req,res)
});
 */
module.exports = router;
