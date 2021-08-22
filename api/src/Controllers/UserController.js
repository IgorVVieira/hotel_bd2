import { ObjectID } from 'mongodb';
import { db } from '../database/connection';

class User {
    async store(request, response) {
        try {
            const { nome, idade, cpf, email, senha, adm } = request.body;
            const user = await db.collection('users').insertOne({
                nome,
                idade,
                cpf,
                email,
                senha,
                adm,
            });

            return response.json(user);
        } catch (error) {
            return response.status(500).json({ 'Erro': error });
        }
    }

    async update(request, response) {
        try {
            const { id, nome, email, cpf, idade, senha } = request.body;
            const user = await db.collection('users').findOneAndUpdate({ _id: ObjectID(id) }, {
                $set: {
                    "nome": nome,
                    "idade": idade,
                    "cpf": cpf,
                    "email": email,
                    "senha": senha,
                }
            });
            return response.json(user);
        } catch (error) {
            return response.status(500).json({ 'Erro': error });
        }
    }
}

export default new User;