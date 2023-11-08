import { connection } from 'mongoose';
// import api from '../../helpers/app';
import { server, app } from '../../../../index';
// import { Server } from "../../configs/Server";
import { user } from '../../helpers/authentication';

import supertest from 'supertest';

const api = supertest(app);

describe('Test authentication router', () => {
	test.only('return Hello Word', async () => {
		await api.get('/').expect(200);
	});
	describe('POST /auth/register', () => {
		test('The route is valid', async () => {
			const response = await api
				.post('/v1/auth/register')
				.send(user)
				.set('Accept', 'application/json');
			expect(response.status).toBe(200);
		});

		test.skip('should return a status 400 when the body is bad', async () => {
			const response = await api
				.post('/v1/auth/register')
				.send({ email: 'test', password: '123' })
				.set('Accept', 'application/json');
			expect(response.status).toBe(400);
		});

		test('should return the register user', async () => {
			const response = await api
				.get('/v1/users/:email')
				.send({ email: user.email })
				.set('Accept', 'application/json');
			expect(response.status).toBe(200);
		});

		test('should return a JSON file', async () => {
			const response = await api
				.post('/v1/auth/register')
				.send(user)
				.set('Accept', 'application/json');
			expect(response.body[0]).toHaveProperty('email');
		});
	});

	describe('GET /auth/login', () => {
		test('the route is valid', async () => {
			await api
				.post('/v1/auth/login')
				.send({ email: user.email, password: user.password })
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /application\/json/);
		});
	});
});

afterAll(() => {
	connection.close();
	server.close();
});
