import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionsRouter;
