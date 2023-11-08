import api from '../../helpers/app';
import { server } from '../../../../index';
// import { Server } from "../../configs/Server";
import { UserModel } from '../../../models/users';
import { users } from '../../helpers/users';

beforeEach(async () => {
	await UserModel.deleteMany({});

	const user1 = new UserModel(users[0]);
	await user1.save();

	const user2 = new UserModel(users[1]);
	await user2.save();
});

describe.skip('Test the users router', () => {
	describe('GET /users', () => {
		beforeEach(async () => {});

		test('The route is valid', async () => {
			const response = await api.get('/v1/users').send();
			expect(response.status).toBe(200);
		});

		test('the response header contains content-type = json', async () => {
			const response = await api.get('/v1/users').send();
			expect(response.headers['content-type']).toContain('json');
		});

		test('should return an array', async () => {
			const response = await api.get('/v1/users').send();
			expect(response.body).toHaveLength(users.length);
		});
	});
});

afterAll(() => {
	// connection.close();
	server.close();
});
