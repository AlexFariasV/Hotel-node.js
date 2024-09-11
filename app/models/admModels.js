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
};

module.exports = admModel;
