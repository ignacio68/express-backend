import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from '../v1/router';

import { API_BASE_URL } from '../constants';
import { errorHandler } from '../v1/middlewares/globalErrorHandler';

export class Server {
	private static app: Express;

	private constructor() {}

	public static getServer(): Express {
		if (!Server.app) {
			const app = express();
			Server.app = app;
			try {
				Server.app.use(express.urlencoded({ extended: false }));
				Server.app.use(express.json());
				Server.app.use(compression());
				Server.app.use(
					cors({
						credentials: true,
					}),
				);

				Server.app.use(cookieParser());
				Server.app.use(API_BASE_URL as string, router());
				Server.app.use('*', errorHandler);
			} catch (error) {
				console.log('Server Error:', error);
				throw error;
			}
		}
		return Server.app;
	}
}
