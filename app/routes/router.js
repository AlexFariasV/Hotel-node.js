var express = require("express");
var router = express.Router();
var TarefasControl = require("../controllers/control")
const { body, validationResult } = require("express-validator");
const { notifyMessages } = require('../util/funcao')
const {gravarUsuAutenticado, gravarUsuAutenticadoCadastro, limparSessao} = require('../models/autenticador_middleware')

router.get("/", function (req, res) {
    res.render("pages/home", {pagina:"home"});
});
router.post('/sair', limparSessao, function (req, res) {
    res.redirect('/')
  })
/* ====================================Login=================================================== */

router.get("/login", function (req, res) {
    res.render("pages/login", {pagina:"login", logado:null, dados: null, listaErros: null, dadosNotificacao: null});
});
router.post('/login', TarefasControl.regrasValidacaoFormLogin, gravarUsuAutenticado, function (req, res) {
    TarefasControl.logar(req, res);
})

/* =====================================Cadastro================================================= */
router.get("/cadastro", function (req, res) {
    res.render("pages/cadastro", {pagina:"cadastro", logado:null, retorno: null, listaErros: null, dados: null, 
    dadosNotificacao: null  });
});
router.post("/cadastro", TarefasControl.regrasValidacao , gravarUsuAutenticadoCadastro , async function (req, res) {
    TarefasControl.Criarussuario(req,res)
});
/* ============================================================================================= */

router.get("/quartos", function (req, res) {
    res.render("pages/client/quartos",{logado: null, dadosNotificacao: null,listaErros: null , dados: null});
});
router.get("/perfil", function (req, res) {
    res.render("pages/client/perfil");
});

router.get("/config", function (req, res) {
    res.render("pages/client/config");
})
/* ======================================adm======================================================= */
router.get("/adm", function (req, res) {
    res.render("pages/adm/adm", {dadosNotificacao:null, logado:null});
})

module.exports = router;
