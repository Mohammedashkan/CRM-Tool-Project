import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await AuthService.register(req.body);
    res.status(201).json({ success: true, message: 'User registered successfully', data: result });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await AuthService.login(req.body);
    res.json({ success: true, message: 'Login successful', data: result });
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;
    const result = await AuthService.refreshToken(refreshToken);
    res.json({ success: true, message: 'Token refreshed', data: result });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;
    await AuthService.logout(refreshToken);
    res.json({ success: true, message: 'Logged out successfully', data: null });
  } catch (error) {
    next(error);
  }
}
