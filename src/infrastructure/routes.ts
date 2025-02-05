import { Router, Express } from 'express';
import ControllerPG from '../domain/controller/controller-pg-user';

const router = Router();

router.post('/register', ControllerPG.createUser);
router.delete('/register/:id',ControllerPG.deleteUser);
router.put('/register/:id',ControllerPG.updateUser);
export default (app: Express): void => {
  app.use(router);
};
