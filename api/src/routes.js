import { Router } from 'express';
const route = Router();

import QuartoController from './Controllers/QuartoController';
import ReservaController from './Controllers/ReservaController';
import UserController from './Controllers/UserController';
import SessionController from './Controllers/SessionController';

route.post('/login', SessionController.login);

route.post('/quarto', QuartoController.store);
route.get('/quartos', QuartoController.index);
route.get('/quarto/:id', QuartoController.show);

route.post('/reserva/:quarto_id/:user_id', ReservaController.store);

route.get('/users', UserController.index);
route.get('/user/:id', UserController.show);
route.post('/user', UserController.store);

export default route;