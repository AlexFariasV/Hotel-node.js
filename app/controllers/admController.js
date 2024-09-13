const admModel = require('../models/admModels.js');

const admController = {
    listAllUsers: async (req, res) => {
        try {
            let pagina = req.query.pagina == undefined ? 1 : parseInt(req.query.pagina);
            let regPagina = 2;
            let inicio = (pagina - 1) * regPagina;

            let totReg = await admModel.totalReg();
            let totPaginas = Math.ceil(totReg[0].total / regPagina);

            let users = await admModel.findPage(inicio, regPagina);

            let paginador = totReg[0].total <= regPagina ? null : { 
                "pagina_atual": pagina, 
                "total_reg": totReg[0].total, 
                "total_paginas": totPaginas 
            };

            // Salvando a notificação em uma variável temporária e remover da sessão
            const notificacao = req.session.dadosNotificacao || null;
            if (req.session.dadosNotificacao) {
                delete req.session.dadosNotificacao;
            }

            // Renderizar a página 
            res.render('pages/adm/adm', {
                autenticado: req.session.autenticado,
                users, // Atualizado para usar o resultado paginado
                dadosNotificacao: notificacao,
                paginador: paginador
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    //Excluir usuário da tabela 
    deleteUse: async (req, res) => {
        const { id, type } = req.params;
        try {
            await admModel.findByTypeDelete(id);
            
            // Notificação pode ser salva na sessão, se necessário
            req.session.dadosNotificacao = {
                titulo: "Sucesso",
                mensagem: "Usuário deletado com sucesso",
                tipo: "success"
            };
    
            if (type == '1') {
                res.redirect('/adm');
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar o usuário" });
        }
    }
    
}



module.exports = admController;
