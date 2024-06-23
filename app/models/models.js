var pool = require("../../config/pool_conexoes")

const tarefasModel = {
    create: async (data) => {
        try {
            const [linhas] = await pool.query('INSERT INTO usuario (`nome_usuario`, `email_usuario`,`cpf_usuario`,`senha_usuario`  ) VALUES ( ? , ? , ? , ? ) ',
                [data.nome, data.email, data.cpf, data.senha])
            return linhas;

        } catch (error) {
            return error;
        }

    },
    findByEmail: async (data) => {
        try {
            const [linhas] = await pool.query('SELECT * FROM usuario WHERE email_usuario = ? ', [data])

            return linhas;
        } catch (error) {
            return error;
        }
    },
    findByCpf: async (data, id) => {
        try {
            const [linhas] = await pool.query(`SELECT * FROM usuario WHERE cpf_usuario  = ? ${id ? 'AND id_usuario != ?' : ''}`, [data, id])

            return linhas;
        } catch (error) {
            return error;
        }
    },

};

module.exports = tarefasModel;
