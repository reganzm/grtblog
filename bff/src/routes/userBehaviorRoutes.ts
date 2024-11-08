import { Router } from 'express';
import * as userController from '../controllers/userBehaviorController';

const router = Router();

router.post('/userBehavior', userController.addUserBehavior);

export default router;
