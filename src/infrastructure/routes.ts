import { Router, Express } from 'express';
import ControllerPG from '../domain/controller/controller-pg-user';
import { authMiddleware } from '../common/util/auth/auth-middleware';

const router = Router();

router.post('/register',  ControllerPG.createUser);
router.post('/login', ControllerPG.loginUser);
router.delete('/register/:id', authMiddleware,ControllerPG.deleteUser);
router.put('/register/:id', authMiddleware,ControllerPG.updateUser);
export default (app: Express): void => {
  app.use(router);
};
