const tarefasModel = require("../models/models");
const { body, validationResult } = require("express-validator");
const { validaCPF } = require('../util/funcao')
const bycrypt = require("bcryptjs");
const salt = bycrypt.genSaltSync(12)

const TarefasControl = {
    logar: (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.render("pages/login", { pagina: "login", dados: req.body, listaErros: erros, logado: null, dadosNotificacao: null })
        }
        if (req.session.autenticado != null) {
                console.log(req.session.autenticado.tipo)
            if (req.session.autenticado.tipo == 1) {
                res.render("pages/client/quartos", { pagina: "home", listaErros: null,logado: null, dados: null, dadosNotificacao:{titulo: "success", mensagem: "bem-vindo de volta ", tipo:"success"}})

            } else if (req.session.autenticado.tipo == 3) {
                res.render("pages/adm/adm", { listaErros: null,logado: null, pagina:"adm", dados: null, dadosNotificacao:{titulo: "success", mensagem: "bem-vindo adm ", tipo:"success"}});
            } else {
                res.render("pages/login", { listaErros: null,logado: null, dados: null,dadosNotificacao:{titulo: "error", mensagem: "Usuário não permitido", tipo:"erros"} })
            }
        }else {
            res.render("pages/login", { listaErros: null, dados: null,logado:null, dadosNotificacao:{titulo: "error", mensagem: "Usuário senha invalido ", tipo:"erros"} })
        }

    },
    regrasValidacaoFormLogin: [
        body("email")
            .isEmail()
            .withMessage("Email invalido "),
        body("senha")
            .isLength({ min: 8, max: 30 })
            .withMessage("Senha inválida, deve conter pelo menos 8 caracteres")
            .bail()
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)
            .withMessage("Senha inválida, deve conter pelo menos 1 letra, 1 número e 1 caractere especial"),

    ],


    Criarussuario: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("pages/cadastro", {
                dados: req.body,
                listaErros: errors,
                pagina: "cadastro",
                logado: null
            });
        }
        try {
            const resultados = await tarefasModel.create({ ...req.body, senha: bycrypt.hashSync(req.body.senha) })

            res.render("pages/client/quartos", {
                logado: null, dadosNotificacao: {
                    titulo: "Cadastro realizado!",
                    mensagem: "Novo usuário criado com sucesso!",
                    tipo: "success"
                }
            })
        } catch (error) {
            return error;
        }
    },
    regrasValidacao: [
        body("nome")
            .isLength({ min: 3, max: 45 })
            .withMessage("Nome invalido "),
        body("email")
            .isEmail()
            .withMessage("Email invalido ")
            .custom(async (value) => {
                const email = await tarefasModel.findByEmail(value)
                if (email.length > 0) {
                    throw new Error('Email já utilizado.');
                }
                return true;
            }),
        body("cpf")
            .isLength({ min: 14, max: 14 })
            .withMessage("Cpf inválido ")
            .bail()
            .custom(async (value) => {
                if (validaCPF(value)) {
                    const cpf = await tarefasModel.findByCpf(value)
                    if (cpf.length > 0) {
                        throw new Error('Cpf já utilizado');
                    }
                    return true;
                } else {
                    throw new Error('Cpf inválido');
                }
            }),

        body("senha")
            .isLength({ min: 8, max: 30 })
            .withMessage("Senha inválida, deve conter pelo menos 8 caracteres")
            .bail()
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)
            .withMessage("Senha inválida, deve conter pelo menos 1 letra, 1 número e 1 caractere especial"),

        body("c-senha")
            .notEmpty()
            .withMessage('Campo vazio.')
            .bail()
            .custom((value, { req }) => {
                const senha = req.body.senha
                if (value != senha) {
                    throw new Error('Senha diferentes.')
                }
                return true;
            })
    ],


}


module.exports = TarefasControl;