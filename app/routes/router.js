var express = require("express");
var router = express.Router();
var TarefasControl = require("../controllers/control")
const { body, validationResult } = require("express-validator");
const { notifyMessages } = require('../util/funcao')
const {gravarUsuAutenticado, gravarUsuAutenticadoCadastro, limparSessao, verificarUsuAutorizado} = require('../models/autenticador_middleware')

router.get("/", function (req, res) {
    res.render("pages/home", {pagina:"home", autenticado: req.session.autenticado});
});

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
router.post('/sair', limparSessao, function (req, res) {
    res.redirect('/')
}); 
router.get('/verificar-autenticacao', verificarUsuAutorizado([1, 2, 3], 'pages/restrito'), function (req, res) {
    TarefasControl.redirectByType(req, res)
})

router.get("/quartos", verificarUsuAutorizado([1,3], 'pages/restrito'), function (req, res) {
    res.render("pages/client/quartos",{logado: null, dadosNotificacao: null,listaErros: null , dados: null, autenticado: req.session.autenticado});
});
router.get("/perfil",verificarUsuAutorizado([1, 3], 'pages/restrito'), function (req, res) {
    res.render("pages/client/perfil",{autenticado: req.session.autenticado});
});

router.get("/config",verificarUsuAutorizado([1, 3], 'pages/restrito'), function (req, res) {
    res.render("pages/client/config",{autenticado: req.session.autenticado});
})
/* ======================================adm======================================================= */
router.get("/adm", verificarUsuAutorizado([3], 'pages/restrito'), function (req, res) {
    res.render("pages/adm/adm", {dadosNotificacao:null, logado:null, autenticado: req.session.autenticado});
})

module.exports = router;
