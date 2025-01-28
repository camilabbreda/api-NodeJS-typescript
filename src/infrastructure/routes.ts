import { Router, Express } from 'express';
import ControllerPG from '../domain/controller/controller-pg-user';

const router = Router();

router.post('/register', ControllerPG.createUser);

export default (app: Express): void => {
  app.use(router);
};
