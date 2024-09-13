var pool = require("../../config/pool_conexoes");

const admModel = {
    findAllUsers: async () => {
        try {
            const [result] = await pool.query('SELECT * FROM usuario');
            return result; 
        } catch (error) {
            throw new Error(`Erro ao buscar todos os usuários: ${error.message}`);
        }
    },
    //paginador 
    findPage: async (pagina, total) => {
        try {
            const [linhas] = await pool.query('SELECT * FROM usuario ORDER BY id_usuario DESC LIMIT ?, ?', [pagina, total]);
            return linhas;
        } catch (error) {
            return error;
        }
    },

    totalReg: async () => {
        try {
            const [linhas] = await pool.query('SELECT count(*) as total FROM usuario');
            return linhas;
        } catch (error) {
            return error;
        }
    },
    //excluindo usuário da tabela 
    findByTypeDelete: async (id) => {
        try {
            await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao excluir usuário: ' + error.message);
        }
    },
};

module.exports = admModel;
