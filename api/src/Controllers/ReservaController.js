import db from '../database/connection';

class ReservaController {
    async minhasReservas(request, response) {
        try {
            const { user_id } = request.params;

            const cursor = await db.query(`
                FOR reservas IN reserva
                FILTER reservas._from == 'users/${user_id}'
                RETURN reservas`);

            const reservas = await cursor.all();

            console.log(reservas);
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

            const reserva = await db.collection('reserva').save({
                _from: `users/${user_id}`,
                _to: `quartos/${quarto_id}`,
                status: 1,
                data_reserva: data_reserva,
            });

            return response.json(reserva);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ 'Erro': error });
        }
    }

    async finalizarReserva(request, response) {
        try {
            const { reserva_id } = request.body;
            
            await db.query(`
                FOR reservas IN reserva
                FILTER reservas._key == '${reserva_id}'
                UPDATE reservas WITH {status: ${0}}
                IN reserva`);

            return response.status(200);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ 'Erro': error });
        }
    }
}

export default new ReservaController;