import { ObjectID } from 'mongodb';
import { db } from '../database/connection';

class ReservaController {
    async minhasReservas(request, response) {
        try {
            const { user_id } = request.params;

            const reservas = await db.collection('quartos').find({
                'reservas.user_id': {
                    $eq: user_id
                }
            }).toArray();
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
}

export default new ReservaController;