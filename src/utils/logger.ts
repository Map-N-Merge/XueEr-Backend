import pino from 'pino';

import { config } from '../config/env';

const logger = pino(
	config.server.isDevelopment
		? {
				level: 'debug',
				transport: {
					target: 'pino-pretty',
					options: {
						colorize: true,
						translateTime: 'yyyy-mm-dd HH:MM:ss',
						ignore: 'pid,hostname',
					},
				},
				formatters: {
					level: label => ({ level: label }),
				},
				timestamp: pino.stdTimeFunctions.isoTime,
			}
		: {
				level: 'info',
				formatters: {
					level: label => ({ level: label }),
				},
				timestamp: pino.stdTimeFunctions.isoTime,
			}
);

export default logger;
