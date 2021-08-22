import { ObjectID } from 'mongodb';
import db from '../database/connection';

class QuartoController {
    async index(request, response) {
        try {
            const cursor = await db.query(`
                FOR quarto IN quartos
                RETURN quarto`);

            const quartos = await cursor.all();
            return response.json(quartos);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ 'Erro': error });
        }
    }

    async show(request, response) {
        try {
            const { id } = request.params;
            const quarto = await db.collection('quartos').findOne({
                _id: ObjectID(id),
            });

            if (!quarto) {
                return response.json({ Error: 'Quarto não encontrado.' });
            }
            return response.json(quarto);
        } catch (error) {
            return response.status(500).json({ 'Erro': error });
        }
    }
    async store(request, response) {
        try {
            const { andar, valor, descricao } = request.body;
            const quarto = await db.collection('quartos').save({
                andar,
                valor,
                descricao,
            });
            return response.json(quarto);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ 'Erro': error });
        }
    }

    async update(request, response) {
        try {
            const { id, codigo, andar, valor, descricao } = request.body;
            const quarto = await db.collection('quartos').findOneAndUpdate({ _id: ObjectID(id) }, {
                $set: {
                    "andar": andar,
                    "valor": valor,
                    "descricao": descricao,
                }
            });
            return response.json(quarto);
        } catch (error) {
            return response.status(500).json({ 'Erro': error });
        }
    }
    async destroy(request, response) {
        try {
            const { id } = request.params;
            await db.collection('quartos').deleteOne({ _id: ObjectID(id) });

            return response.status(200);
        } catch (error) {
            return response.status(500).json({ 'Erro': error });
        }
    }
}

export default new QuartoController;