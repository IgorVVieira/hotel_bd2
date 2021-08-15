import { ObjectID } from 'mongodb';
import { db } from '../database/connection';

class ReservaController {
    async minhasReservas(request, response) {
        try {
            const { user_id } = request.params;
            console.log(user_id);

            const reservas = await db.collection('quartos').aggregate(
                { $unwind: "$reservas" },
                { $match: { "reservas.user_id": user_id } },
                { $group: { _id: "$_id", reservas: { $push: "$reservas" } } }
            ).toArray();
            return response.json(reservas);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ 'Erro': error });
        }
    }
    async store(request, response) {
        try {
            const { quarto_id, user_id } = request.params;
            const { data_reserva } = request.body;

            const reserva = await db.collection('quartos').updateOne({ _id: ObjectID(quarto_id) }, {
                $addToSet: {
                    "reservas": {
                        "_id": new ObjectID(),
                        "data_reserva": data_reserva,
                        "user_id": user_id,
                        "quarto_id": quarto_id,
                        "status": 1,
                    }
                }
            });

            return response.json(reserva);
        } catch (error) {
            return response.status(500).json({ 'Erro': error });
        }
    }

    async finalizarReserva(request, response) {
        try {
            const { reserva_id } = request.body;
            const reserva = await db.collection('quartos').updateOne(
                {
                    'reservas._id': ObjectID(reserva_id),
                },
                {
                    $set: {
                        'reservas.$.status': 0,
                    }
                });

            return response.json(reserva);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ 'Erro': error });
        }
    }
}

export default new ReservaController;