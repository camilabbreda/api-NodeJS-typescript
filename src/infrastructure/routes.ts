import { Router, Express } from 'express';
import ControllerPG from '../domain/controller/controller-pg-user';
import { authMiddleware } from '../common/util/auth/auth-middleware';

const router = Router();

router.post('/user/register',  ControllerPG.createUser);
router.post('/user/login', ControllerPG.loginUser);
router.get('/user/', ControllerPG.getAllUsers);
router.get('/user/:id', ControllerPG.getUserById);
router.delete('/user/register/:id', authMiddleware,ControllerPG.deleteUser);
router.put('/user/register/:id', authMiddleware,ControllerPG.updateUser);



export default (app: Express): void => {
  app.use(router);
};
