const tarefasModel = require("../models/models");

const { notifyMessages } = require('../util/funcao')


const { body, validationResult } = require("express-validator");
const TarefasControl = {

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
            await tarefasModel.create(req.body)

            const msgs = notifyMessages(req, res)
            
            req.flash('success', `Bem-vindo, ${req.body.nome}`)

            res.render("pages/test", {msgs});

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