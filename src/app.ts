import cors from 'cors';
import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

import { config } from './config/env';
import logger from './utils/logger';

const app: Express = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
	cors({
		origin: config.cors.origins,
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
	logger.info({
		method: req.method,
		url: req.url,
		userAgent: req.get('User-Agent'),
		ip: req.ip,
	});
	next();
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
	res.status(200).json({
		status: 'ok',
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
		environment: config.server.nodeEnv,
	});
});

// API routes
// API routes
app.get('/api/test', async (_req: Request, res: Response) => {
	try {
		// Basic API test without Firebase dependency
		res.status(200).json({
			message: 'API is working!',
			server: 'Express + TypeScript',
			timestamp: new Date().toISOString(),
			environment: config.server.nodeEnv,
			features: {
				cors: 'enabled',
				helmet: 'enabled',
				logger: 'pino',
				validation: 'zod',
			},
		});
	} catch (error) {
		logger.error({ error }, 'Test endpoint error');
		res.status(500).json({
			message: 'Internal server error',
			error: config.server.isDevelopment ? String(error) : 'Something went wrong',
		});
	}
});

// 404 handler
app.use((req: Request, res: Response) => {
	res.status(404).json({
		message: 'Route not found',
		path: req.originalUrl,
	});
}); // Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	logger.error({ error: err }, 'Unhandled error');

	res.status(500).json({
		message: 'Internal server error',
		error: config.server.isDevelopment ? err.message : 'Something went wrong',
	});
});

export default app;
