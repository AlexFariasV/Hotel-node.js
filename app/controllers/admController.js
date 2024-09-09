/* const admModel = require('../models/admModels.js');

const admController = {
    listAllUsers: async (req, res) => {
        try {
            const result = await admModel.findAllUsers();
            
            const tipo = req.session.autenticado ? req.session.autenticado.tipo : null;

            res.render('pages/adm/adm', { 
                users: result,  
                id: null, 
                dados: null, 
                listaErros: null, 
                type: tipo, 
                autenticado: req.session.autenticado 
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = admController;
 */