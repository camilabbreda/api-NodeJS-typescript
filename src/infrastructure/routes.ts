import { Router, Express } from 'express';
import ControllerPG from '../domain/controller/controller-pg-user';

const router = Router();

router.post('/cadastro', ControllerPG.createUser);

export default (app: Express): void => {
  app.use(router);
};
