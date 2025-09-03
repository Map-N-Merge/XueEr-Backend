import app from './app';
import { config } from './config/env';
import logger from './utils/logger';

const startServer = (): void => {
	try {
		const server = app.listen(config.server.port, () => {
			logger.info(
				{
					port: config.server.port,
					nodeEnv: config.server.nodeEnv,
					pid: process.pid,
				},
				'Server started successfully'
			);

			logger.info(`🚀 Server is running on http://localhost:${config.server.port}`);
			logger.info(`📄 API Documentation: http://localhost:${config.server.port}/health`);
		});

		// Graceful shutdown
		const gracefulShutdown = (signal: string) => {
			logger.info(`Received ${signal}. Starting graceful shutdown...`);

			server.close(() => {
				logger.info('HTTP server closed');
				process.exit(0);
			});

			// Force shutdown after 10 seconds
			setTimeout(() => {
				logger.error('Forced shutdown after timeout');
				process.exit(1);
			}, 10000);
		};

		process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
		process.on('SIGINT', () => gracefulShutdown('SIGINT'));
	} catch (error) {
		logger.error({ error }, 'Failed to start server');
		process.exit(1);
	}
};

startServer();
