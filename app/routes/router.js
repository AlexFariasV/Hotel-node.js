var express = require("express");
var router = express.Router();
var TarefasControl = require("../controllers/control")
var admController = require("../controllers/admController")
const { body, validationResult } = require("express-validator");
const { notifyMessages } = require('../util/funcao')
const {gravarUsuAutenticado, gravarUsuAutenticadoCadastro, limparSessao, verificarUsuAutorizado} = require('../models/autenticador_middleware')

/* ====================================home============================================================== */
router.get("/", function (req, res) {
    res.render("pages/home", {pagina:"home", autenticado: req.session.autenticado});
});

/* ====================================Login============================================================= */

router.get("/login", function (req, res) {
    res.render("pages/login", {pagina:"login", logado:null, dados: null, listaErros: null, dadosNotificacao: null});
});
router.post('/login', TarefasControl.regrasValidacaoFormLogin, gravarUsuAutenticado, function (req, res) {
    TarefasControl.logar(req, res);
})

/* =====================================Cadastro========================================================== */
router.get("/cadastro", function (req, res) {
    res.render("pages/cadastro", {pagina:"cadastro", logado:null, retorno: null, listaErros: null, dados: null, 
    dadosNotificacao: null  });
});
router.post("/cadastro", TarefasControl.regrasValidacao , gravarUsuAutenticadoCadastro , async function (req, res) {
    TarefasControl.Criarussuario(req,res)
});

/* =========================================autenticaão===================================================== */
router.post('/sair', limparSessao, function (req, res) {
    res.redirect('/')
}); 
router.get('/verificar-autenticacao', verificarUsuAutorizado([1, 3], 'pages/restrito'), function (req, res) {
    TarefasControl.redirectByType(req, res)
})

/* =========================================quartos========================================================= */
router.get("/quartos", verificarUsuAutorizado([1,3], 'pages/restrito'), function (req, res) {
    const dadosNotificacao = req.session.dadosNotificacao || null;
    delete req.session.dadosNotificacao; 

    res.render("pages/client/quartos",{logado: null, dadosNotificacao: dadosNotificacao, listaErros: null , dados: null, autenticado: req.session.autenticado});
});
router.get("/perfil",verificarUsuAutorizado([1, 3], 'pages/restrito'), function (req, res) {
    res.render("pages/client/perfil",{autenticado: req.session.autenticado});
});

router.get("/config",verificarUsuAutorizado([1, 3], 'pages/restrito'), function (req, res) {
    res.render("pages/client/config",{autenticado: req.session.autenticado});
})
/* ======================================adm==================================================================*/
router.get("/adm", verificarUsuAutorizado([3], 'pages/restrito'), function (req, res) {
    admController.listAllUsers (req,res)

})

router.delete('/adm/delete/:id/:type', verificarUsuAutorizado([3], 'pages/restrito'), admController.deleteUse);

module.exports = router;
