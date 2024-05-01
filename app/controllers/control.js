const tarefasModel = require("../models/models");
const moment = require("moment");
const { body, validationResult } = require("express-validator");
const TarefasControl = {

    Criarussuario: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log(errors);
          return res.render("pages/template-home", {
            dados: req.body,
            listaErros: errors,
            pagina: "cadastro",
            logado: null

          });
        }
        try {
            const resultados = await tarefasModel.create(req.body)
            res.render("pages/template-home", { pagina: "home", logado: null, });

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
            .withMessage("senha invalido, deve conter pelo menos 8 digitos "),

        body("c-senha")
            .notEmpty()
            .withMessage('Campo vazio.')
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