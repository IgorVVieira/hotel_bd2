import { Router } from 'express';
const route = Router();

import QuartoController from './Controllers/QuartoController';
import ReservaController from './Controllers/ReservaController';

route.post('/quarto', QuartoController.store);
route.get('/quartos', QuartoController.index);
route.get('/quarto/:id', QuartoController.show);

route.post('/reserva/:quarto_id/:user_id', ReservaController.store);

export default route;