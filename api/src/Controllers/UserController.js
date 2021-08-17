import { ObjectID } from 'mongodb';
import db from '../database/connection';

class User {
    async index(request, response) {
        try {
            const users = await db.collection('users').find().toArray();
            return response.json(users);
        } catch (error) {
            return response.status(500).json({ 'Erro': error });
        }
    }

    async show(request, response) {
        try {
            const { id } = request.params;
            const user = await db.collection('users').findOne({
                _id: ObjectID(id),
            });

            if (!user) {
                return response.status(40).json({ Error: 'User not found' });
            }
            return response.json(user);
        } catch (error) {
            return response.status(500).json({ 'Erro': error });

        }
    }

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