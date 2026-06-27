import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from './middleware/rateLimiter';
import routes from './routes';
import mockRoutes from './routes/mock.routes';
import { notFoundHandler } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';
import { initPrisma } from './utils/prismaClient';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimit);

// If MOCK_API is set, mount mock routes first and skip real DB initialization
if (process.env.MOCK_API === 'true') {
	app.use('/api/v1', mockRoutes);
} else {
	app.use('/api/v1', routes);
}

app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.MOCK_API !== 'true') {
	initPrisma();
} else {
	// in mock mode we don't initialize Prisma
	// eslint-disable-next-line no-console
	console.info('Running in MOCK_API mode — Prisma initialization skipped.');
}

export default app;
