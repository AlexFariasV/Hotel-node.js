const admModel = require('../models/admModels.js');

const admController = {
    listAllUsers: async (req, res) => {
        try {
            const User = await admModel.findAllUsers();

            // Salvando a notificação em uma variável temporária e remover da sessão
            const notificacao = req.session.dadosNotificacao || null;
            if (req.session.dadosNotificacao) {
                delete req.session.dadosNotificacao;
            }

            // Renderizar a página 
            res.render('pages/adm/adm', {
                autenticado: req.session.autenticado,
                User,
                dadosNotificacao: notificacao
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = admController;
