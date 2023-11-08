import { User } from 'types';

export const user = {
	email: 'johndoe@test.com',
	password: '123',
	userName: 'John Doe',
};

export const registerUser: User = {
	id: '653a9ae251c16622741e219b',
	email: 'johndoe@test.com',
	userName: 'John Doe',
	authentication: {
		password: '123',
		salt: '1',
		sessionToken: '123456',
	},
};
