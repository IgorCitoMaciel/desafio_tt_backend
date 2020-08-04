import { Router } from 'express';
import SessionController from './controllers/SessionController';

const routes = new Router();

routes.post('/sessions', SessionController.register);
routes.post('/sessions/login', SessionController.login);
routes.post('/sessions/forgot_password', SessionController.forgotPassword);
routes.post('/sessions/reset_password', SessionController.resetPassword);

export default routes;