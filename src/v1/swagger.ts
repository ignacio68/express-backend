import { Express, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Basic Meta Informations about our API
const options = {
	definition: {
		openapi: '3.0.0',
		info: { title: 'Express + MongoDB example API', version: '1.0.0' },
		schemes: ['http', 'https'],
		servers: [{ url: 'http://localhost:3000/' }],
	},
	apis: ['.src/v1/routes/index.ts'],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
export const swaggerDocs = (app: Express, port: number) => {
	// Route-Handler to visit our docs
	app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	// Make our docs in JSON format available
	app.get('/api/v1/docs.json', (_req: Request, res: Response) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});
	console.log(
		`Version 1 Docs are available on http://localhost:${port}/api/v1/docs`,
	);
};
