import { Router } from 'express';
import { login, register, refreshToken, logout } from '../controllers/auth.controller';
import { validateLogin, validateRegister } from '../validators/auth.validator';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router;
