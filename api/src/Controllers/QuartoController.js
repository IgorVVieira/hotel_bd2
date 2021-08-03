import { ObjectID } from 'mongodb';
import { db } from '../database/connection';

class QuartoController {
    async index(request, response) {
        try {
            const quartos = await db.collection('quartos').find().toArray();
            return response.json(quartos);
        } catch (error) {
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
            const { codigo, andar, valor, descricao } = request.body;
            const quarto = await db.collection('quartos').insertOne({
                codigo,
                andar,
                valor,
                descricao,
                status: 0,
            });
            return response.json(quarto);
        } catch (error) {
            return response.status(500).json({ 'Erro': error });
        }
    }
}

export default new QuartoController;