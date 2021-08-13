import { Router } from 'express';
const route = Router();

import QuartoController from './Controllers/QuartoController';
import ReservaController from './Controllers/ReservaController';
import UserController from './Controllers/UserController';
import SessionController from './Controllers/SessionController';

route.post('/login', SessionController.login);

route.post('/quarto', SessionController.verifyJwt, QuartoController.store);
route.get('/quartos', SessionController.verifyJwt, QuartoController.index);
route.get('/quarto/:id', SessionController.verifyJwt, QuartoController.show);
route.delete('/quarto/:id', SessionController.verifyJwt, QuartoController.destroy);

route.post('/reserva/:quarto_id/:user_id', SessionController.verifyJwt, ReservaController.store);

route.get('/users', SessionController.verifyJwt, UserController.index);
route.get('/user/:id', SessionController.verifyJwt, UserController.show);
route.post('/user', UserController.store);
route.put('/user', SessionController.verifyJwt, UserController.update);

export default route;