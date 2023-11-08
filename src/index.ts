import { Server } from './configs/Server';
import { initializeDB } from './configs/database';
import { PORT, MONGO_DB_URI, NODE_ENV } from './constants';
// import { swaggerDocs as V1SwaggerDocs } from './v1/swagger';
import * as swaggerDocument from './v1/swagger.json';
import swaggerUi from 'swagger-ui-express';

export const app = Server.getServer();
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export const server = app.listen(Number(PORT) || 3000, () => {
	console.log(`Server running on http://localhost:${PORT}`);
	// V1SwaggerDocs(app, Number(PORT));
});

console.log(MONGO_DB_URI);
console.log('NODE_ENV', NODE_ENV);

initializeDB(MONGO_DB_URI as string);
