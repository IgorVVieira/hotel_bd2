import db from '../database/connection';

class User {
    async store(request, response) {
        try {
            const { nome, idade, cpf, email, senha, adm } = request.body;
            const user = await db.collection('users').save({
                nome,
                idade,
                cpf,
                email,
                senha,
                adm,
            });

            return response.json(user);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ 'Erro': error });
        }
    }

    async update(request, response) {
        try {
            const { id, nome, email, cpf, idade, senha } = request.body;

           await db.query(` 
                FOR user IN users
                FILTER user._key == '${id}'
                UPDATE user WITH {
                    status: '${nome}',
                    email: '${email}',
                    cpf: '${cpf}',
                    idade: '${idade}',
                    senha: '${senha}'
                }
                IN user`);

            return response.status(200);
        } catch (error) {
            return response.status(500).json({ 'Erro': error });
        }
    }
}

export default new User;