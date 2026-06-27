import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/users.service';

export async function listUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserService.list();
    res.json({ success: true, message: 'Users retrieved', data: users });
  } catch (error) {
    next(error);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserService.get(req.params.id);
    res.json({ success: true, message: 'User retrieved', data: user });
  } catch (error) {
    next(error);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserService.create(req.body);
    res.status(201).json({ success: true, message: 'User created', data: user });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserService.update(req.params.id, req.body);
    res.json({ success: true, message: 'User updated', data: user });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    await UserService.remove(req.params.id);
    res.json({ success: true, message: 'User deleted', data: null });
  } catch (error) {
    next(error);
  }
}
