import { ObjectID } from 'mongodb';
import { db } from '../database/connection';

class ReservaController {
    async store(request, response) {
        try {
            const { quarto_id, user_id } = request.params;
            const { data_reserva } = request.body;

            const reserva = await db.collection('quartos').updateOne({ _id: ObjectID(quarto_id) }, {
                status: 1,
                $set: {
                    "reserva": {
                        "data_reserva": data_reserva,
                        "user_id": user_id,
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