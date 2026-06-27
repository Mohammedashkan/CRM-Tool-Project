import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../utils/prismaClient';
import { config } from '../config';

const ACCESS_TOKEN_EXPIRES_IN = config.jwtAccessExpiry;
const REFRESH_TOKEN_EXPIRES_IN = config.jwtRefreshExpiry;

export class AuthService {
  static async register(payload: { email: string; password: string; name: string; role?: string }) {
    const existing = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existing) {
      const error = new Error('Email already registered');
      (error as any).statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const user = await prisma.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
        name: payload.name,
        role: payload.role || 'Agent'
      }
    });

    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }

  static async login(payload: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      const error = new Error('Invalid credentials');
      (error as any).statusCode = 401;
      throw error;
    }

    const matches = await bcrypt.compare(payload.password, user.password);
    if (!matches) {
      const error = new Error('Invalid credentials');
      (error as any).statusCode = 401;
      throw error;
    }

    const accessToken = (jwt.sign as any)({ userId: user.id, role: user.role }, config.jwtSecret as string, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN as string
    });
    const refreshToken = (jwt.sign as any)({ userId: user.id, role: user.role }, config.jwtRefreshSecret as string, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN as string
    });

    await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id } });

    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      accessToken,
      refreshToken
    };
  }

  static async refreshToken(refreshToken: string) {
    const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!stored) {
      const error = new Error('Invalid refresh token');
      (error as any).statusCode = 401;
      throw error;
    }

    const payload = (jwt.verify as any)(refreshToken, config.jwtRefreshSecret as string) as { userId: string; role: string };
    const accessToken = (jwt.sign as any)({ userId: payload.userId, role: payload.role }, config.jwtSecret as string, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN as string
    });

    return { accessToken };
  }

  static async logout(refreshToken: string) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  }
}
