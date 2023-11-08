import supertest from 'supertest';
import { app } from '../../../index';

const api = supertest(app);

export default api;
